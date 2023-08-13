import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Membership } from "./Type";

type Props = {
  membershipToShowOnModal: Membership;
  closeDetailsModal: () => void;
};

const MembershipModal = ({ membershipToShowOnModal, closeDetailsModal }: Props) => {
  return (
    <Modal toggle={closeDetailsModal} isOpen={true} backdrop={true}>
      <ModalHeader toggle={closeDetailsModal}>{membershipToShowOnModal.user?.name}</ModalHeader>
      <ModalBody>
        <div>
          <p>{membershipToShowOnModal.user?.email}</p>
          <p>Membership ID: {membershipToShowOnModal.id}</p>
          <p>User ID: {membershipToShowOnModal.user?.id}</p>
          <p>Role: {membershipToShowOnModal.role}</p>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default MembershipModal;