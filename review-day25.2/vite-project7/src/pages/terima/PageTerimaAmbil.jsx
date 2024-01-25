// import { useEffect, useRef, useState } from "react";
// import { Form } from "react-bootstrap";
// import useHTTP from "../../libs/hooks/useHTTP";
// import useJWT from "../../libs/hooks/useJWT";
// import { BASE_URL } from "../../libs/config/settings";
// import useMessage from "../../libs/hooks/useMessage";

// const PageTerimaAmbil = (id) => {
//   const [mock, setMock] = useState([]);
//   const data = useRef({ value: "" });
//   const http = useHTTP();
//   const jwt = useJWT();
//   const message = useMessage();

//   const onTerimaDiambil = (id) => {
//     const url = `${BASE_URL}/terima/${id}/diambil`;
//     const config = {
//       headers: {
//         Authorization: jwt.get(),
//       },
//     };

//     http.privateHTTP
//       .post(url, null, config)
//       .then((res) => {
//         message.success(res);
//       })
//       .catch((err) => {
//         message.error(err);
//       });
//   };

//   const addMock = (e) => {
//     if (e.key == "Enter") {
//       onTerimaDiambil(data.current.value);
//       data.current.value = "";
//     }
//   };

//   useEffect(() => {
//     data.current.focus();
//   });

//   return (
//     <>
//       <Form.Control ref={data} onKeyDown={addMock} />

//       <ul>
//         {mock.map((value, index) => {
//           return <li key={index}>{value}</li>;
//         })}
//       </ul>
//     </>
//   );
// };

// export default PageTerimaAmbil;
