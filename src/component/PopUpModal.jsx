import React from 'react';
import { Modal, Divider } from 'antd';

export const PopUpModal = ({
  open,
  setOpen,
  modalData,
}) => {
  return (
    <Modal
      open={open}
      title={`Name: ${modalData.name.charAt(0).toUpperCase() + modalData.name.slice(1)}`}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer={(_, { OkBtn, CancelBtn }) => (
        // eslint-disable-next-line
        <div>
          <CancelBtn />
          <OkBtn />
        </div>
      )}
    >
      <Divider />
      <img style={{ backgroundColor: "aliceblue" }} src={modalData.image} alt="-" />
      <p>Type:
        {modalData.type}
      </p>
      <p>Height: {modalData.height}</p>
      <p>Weight: {modalData.weight}</p>
      <p>Discription: {modalData.descriotion}</p>
    </Modal>
  );
};
