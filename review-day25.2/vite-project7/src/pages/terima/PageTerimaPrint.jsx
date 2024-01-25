import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const PageTerimaPrint = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Container className="mt-4" fluid={true}>
        <h1 className="display-6 mb-4">Bukti Transaksi</h1>
        <Row className="mb-3">
          <Col>
            <Table borderless={true}>
              <tbody>
                <tr>
                  <th>Nomor Transaksi</th>
                  <td>{location.state.nomor}</td>
                </tr>
                <tr>
                  <th>Nomor Transaksi</th>
                  <td>{location.state.tanggal}</td>
                </tr>
                <tr>
                  <th>Stauts</th>
                  <td>{location.state.status.toUpperCase()}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table borderless={true}>
              <tbody>
                <tr>
                  <th>Nama Pelanggan</th>
                  <td>{location.state.pelanggan.nama}</td>
                </tr>
                <tr>
                  <th>Telepon</th>
                  <td>{location.state.pelanggan.telepon}</td>
                </tr>
                <tr>
                  <th>Alamat</th>
                  <td>{location.state.pelanggan.alamat}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Table borderless={true}>
              <thead>
                <tr>
                  <th>Nama Barang</th>
                </tr>
              </thead>
              <tbody>
                {location.state.items.map((value) => {
                  return (
                    <tr key={value._id}>
                      <td>{value.nama}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Table>
              <tbody>
                <tr>
                  <th>Berat</th>
                  <td>{location.state.berat} Kg</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>Rp. {location.state.total}</td>
                </tr>
                <tr>
                  <th>Uang Muka</th>
                  <td>Rp. {location.state.uangMuka}</td>
                </tr>
                <tr>
                  <th>Sisa</th>
                  <td>Rp. {location.state.sisa}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex justify-content-center gap-3">
            <Button
              className="d-print-none"
              onClick={() => navigate("/terima")}
            >
              Back
            </Button>
            <Button className="d-print-none" onClick={window.print}>
              Print
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageTerimaPrint;
