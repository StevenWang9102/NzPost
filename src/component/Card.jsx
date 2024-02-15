import React from 'react';
import { Button } from 'antd';
import { HomeTwoTone, HeartTwoTone } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { doNotDeleteIDs } from '../constant/defaultIds';

export const Card = ({
  pokeman,
  name,
  type,
  height,
  weight,
  pageType,
  onLoveItemClick,
  onDeleteClicked,
  onViewModalClick,
  getPokenmanImage,
  getPokerManID,
}) => {
  let id = '';
  id = getPokerManID(pokeman);

  return (
    <>
      <img style={{ backgroundColor: "aliceblue" }} src={getPokenmanImage(pokeman)} alt="-" />
      <div className="card-details">
        <div className="card-name" >
          {name.charAt(0).toUpperCase() + name.slice(1)}
          {pageType === "favorate" && <HeartTwoTone twoToneColor="#eb2f96" style={{ marginLeft: 5 }} />}
          {pageType === "favorate" && doNotDeleteIDs.includes(id.toString()) && <HomeTwoTone style={{ marginLeft: 5 }} />}
        </div>

        <div className="card-name" >
        </div>

        <table>
          <tbody>
            <tr>
              <td>Type</td>
              <td>{type || "default"}</td>
              <td></td>
            </tr>

            <tr>
              <td>Height</td>
              <td>{height || "default"}</td>
              <td></td>
            </tr>

            <tr>
              <td>Weight</td>
              <td>{weight || "weight"}</td>
              <td></td>
            </tr>

            <tr>
              <td style={{ padding: "5px 0px" }}>
                {pageType === "total" && <Button size="small" onClick={(event) => onLoveItemClick(id)}>
                  I Love it</Button>}

                {pageType === "favorate" && <Button size="small" onClick={(event) => {
                  onViewModalClick(id);
                }}> View</Button>}

              </td>

              <td style={{ padding: "5px 0px" }}>
                {pageType === "favorate" && <Popconfirm
                  title="Delete?"
                  description="Are you sure to delete this?"
                  onConfirm={() => onDeleteClicked(id)}
                  okText="Yes" cancelText="No"
                >
                  {!doNotDeleteIDs.includes(id.toString()) && <Button size="small" danger>Delete</Button>}
                </Popconfirm>
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};