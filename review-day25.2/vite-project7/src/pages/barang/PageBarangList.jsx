import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../libs/config/settings";
import useMessage from "../../libs/hooks/useMessage";
import { Link, useNavigate } from "react-router-dom";

const PageBarangList = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarBarang, setDaftarBarang] = useState([]);
  const [daftarBarangPagination, setDaftarBarangPagination] = useState({});

  //variabel search1
  const [mySearch, setMySearch] = useState("");
  //variabel search2
  const barangSearch = useRef({ value: "" });

  const onBarangList = (params) => {
    const url = `${BASE_URL}/barang`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
      params,
    };
    http.privateHTTP
      .get(url, config)
      .then((res) => {
        const { results, ...pagination } = res.data;
        setDaftarBarangPagination(pagination);
        setDaftarBarang(results);
      })
      .catch((err) => {
        message.error(err);
      });
  };

  //function search1
  const onBarangSearch = (e) => {
    if (e.key == "Enter") {
      onBarangList({ search: barangSearch.current.value });
    }
  };

  //function search2
  const onBarangSearchState = (e) => {
    if (e.key == "Enter") {
      onBarangList({ search: mySearch });
    }
  };

  //pagination
  const onBarangPagination = (page) => {
    onBarangList({ search: barangSearch.current.value, page });
  };

  useEffect(() => {
    onBarangList();
  }, []);

  return (
    <>
      <Container className="mt-4">
        <Row className="mb-4 d-flex align-item-center">
          <Col>
            <h3>Daftar Barang</h3>
          </Col>
          <Col className="d-flex justify-content-end">
            {/* cara routing 1 */}
            {/* <Link to={"/new/test/1/2"} className="btn btn-primary">New Barang Link</Link> */}

            {/* cara routing 2 */}
            <Button onClick={() => navigate("new")}>New Barang</Button>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={12}>
            <Card>
              <Card.Body>
                <Row>
                  {/* Cara Search 1 */}
                  <Col>
                    <Form.Group>
                      <Form.Control
                        className={"w-50 bg-body-tertiary"}
                        ref={barangSearch}
                        onKeyDown={onBarangSearch}
                        placeholder="Search..."
                      />
                    </Form.Group>
                  </Col>

                  {/* Cara Search 2 */}
                  <Col>
                    <Form.Group>
                      <Form.Control
                        className={"w-50 bg-body-tertiary"}
                        value={mySearch}
                        onChange={(e) => setMySearch(e.target.value)}
                        onKeyDown={onBarangSearchState}
                        placeholder="Search..."
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
              <Table responsive={true} striped={true} borderless={true}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarBarang.map((value) => {
                    return (
                      <tr key={value._id}>
                        <th>
                          <Link
                            to={`/detail/${value._id}`}
                            className={"text-decoraation-none"}
                          >
                            {value._id}
                          </Link>
                        </th>
                        <th>{value.nama}</th>
                        <th>{value.created}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <Card.Footer>
                <Pagination>
                  <Pagination.First
                    disabled={!daftarBarangPagination.previous}
                    onClick={() => {
                      onBarangPagination(1);
                    }}
                  />
                  {daftarBarangPagination?.pages?.map((page, index) => {
                    return (
                      <Pagination.Item
                        key={index}
                        onClick={() => onBarangPagination(page.page)}
                      >
                        {page.page}
                      </Pagination.Item>
                    );
                  })}
                  <Pagination.Last
                    disabled={!daftarBarangPagination.next}
                    onClick={() => {
                      onBarangPagination(daftarBarangPagination.totalPage);
                    }}
                  />
                </Pagination>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageBarangList;
