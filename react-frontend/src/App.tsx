import React, { ChangeEvent, FC, useState } from 'react';
import './App.css';
import { Membership } from './Type';
import { fetchMembers } from './Api';
import { Button, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import turnitinLogo from './turnitin-logo.png';

const App: FC<any> = () => {
  const [memberships, setMemberships] = useState<Array<Membership>>([]);
  const [search, setSearch] = useState<string>();
  const [MembershipToShowOnModal, setMembershipToShowOnModal] = useState<Membership | null>(null);

  const loadMemberships = () => {
    return fetchMembers()
      .then(membershipList => setMemberships(membershipList.memberships))
  }

  const updateSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  const loadDetailsModal = (membership: Membership) => {
    setMembershipToShowOnModal(membership);
  }

  const closeDetailsModal = () => {
    setMembershipToShowOnModal(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={turnitinLogo} alt='logo' />
        <div className='user-inputs'>
          <Button color='primary' className='fetch-btn' onClick={loadMemberships}>Fetch Memberships</Button>
          <Input type='text' placeholder='Filter by name/email' onChange={updateSearch} />
        </div>
        {
          memberships?.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                  { memberships.filter(membership => !search
                    || membership.user?.name.toLowerCase().includes(search.toLowerCase())
                    || membership.user?.email.toLowerCase().includes(search.toLowerCase()))
                    .map(membership => (
                      <tr key={membership.id}>
                        <td>{membership.user?.name}</td>
                        <td>{membership.user?.email}</td>
                        <td>
                          <Button color='primary' outline onClick={e => loadDetailsModal(membership)}>Details</Button>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          )
        }
        { MembershipToShowOnModal &&
          (
            <Modal toggle={() => closeDetailsModal()} isOpen={true} backdrop={true}>
              <ModalHeader toggle={e => closeDetailsModal()}>User Details</ModalHeader>
              <ModalBody>
                <div>
                  <p>Name: {MembershipToShowOnModal.user?.name}</p>
                  <p>Email: {MembershipToShowOnModal.user?.email}</p>
                  <p>Membership ID: {MembershipToShowOnModal.id}</p>
                  <p>User ID: {MembershipToShowOnModal.user?.id}</p>
                  <p>Role: {MembershipToShowOnModal.role}</p>
                </div>
              </ModalBody>
            </Modal>
          )
        }
      </header>
    </div>
  );
}

export default App;
