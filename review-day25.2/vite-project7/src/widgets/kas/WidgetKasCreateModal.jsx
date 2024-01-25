import { useState } from "react";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import useMessage from "../../libs/hooks/useMessage";
import useChangeListener from "../../libs/hooks/useChangeListener";
import useValidator from "../../libs/hooks/useValidator";
import { BASE_URL } from "../../libs/config/settings";
import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation";

const WidgetKasCreateModal = ({ callback }) => {
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

  const onKasCreate = () => {
    kasValidator.reset();
    const url = `${BASE_URL}/kas`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .post(url, kas, config)
      .then((res) => {
        message.success(res);
        handleClose();
        callback()
      })
      .catch((err) => {
        message.error(err);
        kasValidator.except(err);
      });
  };

  return (
    <>
      <Button onClick={handleShow}>Tambah Kas</Button>

      <Modal
        show={show}
        onHide={handleClose}
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
        <Modal.Footer>
          <Button onClick={onKasCreate}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

WidgetKasCreateModal.propTypes = {
  callback: PropTypes.func,
};

export default WidgetKasCreateModal;
