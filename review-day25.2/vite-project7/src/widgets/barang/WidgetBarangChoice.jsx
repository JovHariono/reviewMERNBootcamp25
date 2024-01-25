import { Button, Card, Form, ListGroup, Pagination } from "react-bootstrap";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import useMessage from "../../libs/hooks/useMessage";
import { useState } from "react";
import { useRef } from "react";
import { BASE_URL } from "../../libs/config/settings";
import { useEffect } from "react";
import PropTypes from "prop-types";

const WidgetBarangChoice = ({ callback }) => {
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarBarang, setDaftarBarang] = useState([]);
  const [daftarBarangPagination, setDaftarBarangPagination] = useState({});

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

  //pagination
  const onBarangPagination = (page) => {
    onBarangList({ search: barangSearch.current.value, page });
  };

  const onPilih = (barang) => {
    callback(barang);
  };

  useEffect(() => {
    onBarangList();
  }, []);

  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Form.Control
            placeholder="Search..."
            ref={barangSearch}
            className={"bg-body-tertiary"}
            onKeyDown={onBarangSearch}
          />
        </ListGroup.Item>
        {daftarBarang.map((value, index) => {
          return (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between"
            >
              <div>{value.nama}</div>
              <Button
                size="sm"
                onClick={() => {
                  onPilih(value);
                }}
              >
                Pilih
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>

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
  );
};

WidgetBarangChoice.propTypes = {
  callback: PropTypes.func,
};

export default WidgetBarangChoice;
