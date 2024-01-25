import { useState } from "react";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import useMessage from "../../libs/hooks/useMessage";
import useChangeListener from "../../libs/hooks/useChangeListener";
import { BASE_URL } from "../../libs/config/settings";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useValidator from "../../libs/hooks/useValidator";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation";

const WidgetKasDetailModal = ({ id, nomorTransaksi, callback }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [kas, setKas] = useState({
    keterangan: "",
    pemasukkan: 0,
    pengeluaran: 0,
    nomorTransaksi: "",
  });

  const kasValidator = useValidator({
    keterangan: [],
    pemasukkan: [],
    pengeluaran: [],
    nomorTransaksi: [],
  });

  const onKasDetail = () => {
    const url = `${BASE_URL}/kas/${id}`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .get(url, config)
      .then((res) => {
        setKas(res.data);
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const onKasUpdate = () => {
    kasValidator.reset();
    const url = `${BASE_URL}/kas/${id}`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .put(url, kas, config)
      .then((res) => {
        message.success(res);
        handleClose();
        callback();
      })
      .catch((err) => {
        message.error(err);
        kasValidator.except(err);
      });
  };

  const onKasDelete = () => {
    message.confirmRemove(() => {
      const url = `${BASE_URL}/kas/${id}`;
      const config = {
        headers: {
          Authorization: jwt.get(),
        },
      };

      http.privateHTTP
        .delete(url, config)
        .then((res) => {
          message.success(res);
          handleClose();
          callback();
        })
        .catch((err) => {
          message.error(err);
        });
    });
  };

  const onShow = () => {
    onKasDetail();
  };

  return (
    <>
      <Link onClick={handleShow} className={"text-decoraation-none"}>
        {nomorTransaksi}
      </Link>

      <Modal
        show={show}
        onHide={handleClose}
        onShow={onShow}
        size="lg"
        backdrop="static"
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kas Cucian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nomor Transaksi</Form.Label>
            <Form.Control
              name="nomorTransaksi"
              value={kas.nomorTransaksi}
              onChange={(e) => changeListener.onChangeText(e, kas, setKas)}
            />
            <ComponentMessageValidation
              messages={kasValidator.get("nomorTransaksi")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Keterangan</Form.Label>
            <Form.Control
              name="keterangan"
              value={kas.keterangan}
              onChange={(e) => changeListener.onChangeText(e, kas, setKas)}
            />
            <ComponentMessageValidation
              messages={kasValidator.get("keterangan")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Pemasukkan</Form.Label>
            <Form.Control
              name="pemasukkan"
              value={kas.pemasukkan}
              onChange={(e) => changeListener.onChangeNumber(e, kas, setKas)}
            />
            <ComponentMessageValidation
              messages={kasValidator.get("pemasukkan")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>pengeluaran</Form.Label>
            <Form.Control
              name="pengeluaran"
              value={kas.pengeluaran}
              onChange={(e) => changeListener.onChangeNumber(e, kas, setKas)}
            />
            <ComponentMessageValidation
              messages={kasValidator.get("pengeluaran")}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex gap-4">
          <Button variant="danger" onClick={onKasDelete}>
            Delete
          </Button>
          <Button onClick={onKasUpdate}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

WidgetKasDetailModal.propTypes = {
  callback: PropTypes.func,
  id: PropTypes.string,
  nomorTransaksi: PropTypes.string,
};

export default WidgetKasDetailModal;
