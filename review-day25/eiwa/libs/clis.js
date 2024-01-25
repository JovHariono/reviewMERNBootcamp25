require("dotenv").config();

const { program } = require('commander');
const ora = require("ora");
const inquirer = require("inquirer");
const fs = require("fs");
const {
  LibTemplateController,
  LibTemplateModel,
  LibTemplateFilter,
  LibTemplateMiddleware,
  LibTemplateRouter,
  LibTemplateValidator,
} = require("./templates");
const {User} = require("../providers/users/models");
const bcrypt = require("bcrypt");
const {DatabaseMongoDBConnector} = require("./databases");
const file_system = require("fs");
const archiver = require("archiver");

const MODULE_BASE_PATH = `./${process.env.APP_MODULES}`;

const LibCLIMakeFile = (template, path, label) => {
  fs.writeFileSync(path, template);
};

const LibCLIMakeFolder = (modulePath, label) => {
  fs.mkdirSync(modulePath);
};

const LibCLICheckAndGetModulePath = (moduleName) => {
  const modulePath = `${MODULE_BASE_PATH}/${moduleName}`;
  if (fs.existsSync(modulePath)) {
    throw new Error(`module '${moduleName}' already to install.`);
  }
  return modulePath;
};

const LibCLISanitizeName = (name) => {
  return name
    .split("-")
    .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
    .join("");
};

const LibCLICreateUserAdmin = async (answer) => {
  answer.password = bcrypt.hashSync(answer.password, 10)
  answer.isAdmin = true;
  answer.isStaff = true;
  answer.isActive = true;
  await User.create(answer);
}


const LibCLIModule = async () => {
  const answer = await inquirer.prompt([
    {
      name: "name",
      message: "Enter the module name (e.g. products or employee-categories):",
      type: "input",
    },
  ]);

  const moduleName = answer.name;
  const sanitizeName = LibCLISanitizeName(moduleName);
  const modulePath = LibCLICheckAndGetModulePath(moduleName);

  // Make module
  LibCLIMakeFolder(modulePath, "modules");

  // Make controllers
  LibCLIMakeFile(
    LibTemplateController(sanitizeName),
    `${modulePath}/controllers.js`,
    "controllers"
  );

  // Make filters
  LibCLIMakeFile(
    LibTemplateFilter(sanitizeName),
    `${modulePath}/filters.js`,
    "filters"
  );

  // Make middlewares
  LibCLIMakeFile(
    LibTemplateMiddleware(sanitizeName),
    `${modulePath}/middlewares.js`,
    "middlewares"
  );

  // Make models
  LibCLIMakeFile(
    LibTemplateModel(sanitizeName),
    `${modulePath}/models.js`,
    "models"
  );

  // Make routers
  LibCLIMakeFile(
    LibTemplateRouter(sanitizeName, moduleName),
    `${modulePath}/routers.js`,
    "routers"
  );

  // Make validators
  LibCLIMakeFile(
    LibTemplateValidator(sanitizeName),
    `${modulePath}/validators.js`,
    "routers"
  );

};


const LibCLIMakeAdmin = async () => {
  DatabaseMongoDBConnector({hideSuccessMessage: true});
  const answer = await inquirer.prompt([
    {
      name: "username",
      message: "Enter your username:",
      type: "input",
    },
    {
      name: "password",
      message: "Enter your password:",
      type: "password",
    },
    {
      name: "email",
      message: "Enter your email:",
      type: "input",
    }
  ]);


  if (!answer.username || !answer.email || !answer.password) {
    throw new Error("Data must be completed for creating admin.")
  }

  await LibCLICreateUserAdmin(answer)
}

const LibCLIMakePlugin = async () => {
  const answer = await inquirer.prompt([
    {
      name: "module",
      message: "Module name:",
      type: "input",
    },
  ])

  const moduleName = answer.module;
  const moduleDirectorySource = `./${process.env.ARCHIVE_MODULES_DIR}/${moduleName}`
  const moduleDirectoryTarget = `./${process.env.ARCHIVE_PLUGINS_DIR}/${moduleName}.zip`

  if (!fs.existsSync(moduleDirectorySource)) {
    throw new Error(`module '${moduleName}' not installed.`);
  }

  const output = file_system.createWriteStream(moduleDirectoryTarget);
  const archive = archiver('zip');

  archive.on('error', function(err){
    throw err;
  });

  archive.pipe(output);

  archive.directory(moduleDirectorySource, false);
  archive.finalize();
}

const LibCLIRunning = async () => {
  const spinner = ora()

  try {
    program
      .option("--make")
      .option("--module")
      .option("--plugin")
      .option("--install")
      .option("--admin")
    program.parse();

    const options = program.opts();

    if (options.make && options.module) {
      await LibCLIModule()
      spinner.succeed("[eiwa] creating module successfully...")
    }

    if (options.make && options.admin) {
      await LibCLIMakeAdmin()
      spinner.succeed("creating admin successfully...")
    }

    if (options.make && options.plugin) {
      await LibCLIMakePlugin()
      spinner.succeed("creating plugin successfully...")
    }
  } catch (error) {
    spinner.warn(error)
  } finally {
    spinner.stop();
    process.exit(1)
  }
}

LibCLIRunning()
