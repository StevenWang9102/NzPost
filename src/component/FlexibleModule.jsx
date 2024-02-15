// @flow
import React from 'react';
import { Col, Row } from 'antd';
import { Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Card } from './Card';
import { PopUpModal } from './PopUpModal';

const menuItems = [
  {
    label: 'Sort by',
    key: 'SubMenu',
    icon: <DownOutlined />,
    children: [
      {
        type: 'group',
        children: [
          {
            label: 'name',
            key: 'name',
          },
          {
            label: 'weight',
            key: 'weight',
          }, {
            label: 'height',
            key: 'height',
          },
        ],
      },
    ],
  },
];

const getPokenmanImage = (pokeman) => {
  let image = "";
  if (pokeman) {
    if (pokeman.id) {
      image = pokeman.sprites.front_default;
    }
  }
  return image;
};

const getPokerManID = (pokeman) => {
  let id = "";
  if (pokeman) {
    if (pokeman.id) {
      id = pokeman.id;
    } else {
      const match = pokeman.url.match(/\/(\d+)\/$/);
      if (match) {
        id = match[1];
      }
    }
  }
  return id;
};

export const FlexibleModule = ({
  data,
  open,
  setOpen,
  descriotion,
  setDescription,
  pageType,
  onLoveItemClick,
  loading,
  onDeleteClicked,
  onSortClicked,
  onViewModalClick,
  modalData,
}) => {
  let total = 0;
  total = data && data.length;
  return (
    <>
      {pageType === "favorate" && <Menu
        onClick={(e) => { onSortClicked(e.key); }}
        mode="horizontal"
        items={menuItems}
      />}

      {modalData.name
        && <PopUpModal
          open={open}
          setOpen={setOpen}
          modalData={ modalData}
        />
      }

      <div style={{ float: 'right' }}>Total: {total}</div>
      <Row gutter={[16, 24]}>
        {data && data.map((pokeman) => {
          let type = "";
          try {
            type = pokeman.types[0].type.name;
          } catch {
            type = "-";
          }

          let image = "";
          if (pokeman) {
            if (pokeman.id) {
              image = pokeman.sprites.front_default;
            }
          }

          return (
            <Col className="gutter-row" span={8}>
              <div className="card">
                {pageType === "total" && <Card
                  pokeman={pokeman}
                  name={pokeman.name}
                  image={image}
                  open={open}
                  setOpen={setOpen}
                  descriotion={descriotion}
                  setDescription={setDescription}
                  type={type}
                  height={pokeman.height}
                  weight={pokeman.weight}
                  pageType={pageType}
                  loading={loading}
                  onLoveItemClick={onLoveItemClick}
                  onDeleteClicked={onDeleteClicked}
                  onViewModalClick={onViewModalClick}
                  getPokenmanImage={(v) => getPokenmanImage(v)}
                  getPokerManID={(v) => getPokerManID(v)}
                />}

                {pageType === "favorate" && <Card
                  pokeman={pokeman}
                  name={pokeman.name}
                  image={image}
                  open={open}
                  setOpen={setOpen}
                  descriotion={descriotion}
                  setDescription={setDescription}
                  type={type}
                  height={pokeman.height}
                  weight={pokeman.weight}
                  pageType={pageType}
                  loading={loading}
                  onLoveItemClick={onLoveItemClick}
                  onDeleteClicked={onDeleteClicked}
                  onViewModalClick={onViewModalClick}
                  getPokenmanImage={(v) => getPokenmanImage(v)}
                  getPokerManID={(v) => getPokerManID(v)}
                />}
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
