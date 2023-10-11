import { FunctionComponent, PropsWithChildren } from 'react';

import './Modal.scss';

export type ModalProps = PropsWithChildren<{
  open: boolean;
}>;

export const Modal: FunctionComponent<ModalProps> = ({ open, children }) => {
  return open ? (
    <div className="modal-overlay">
      <div className="modal">{children}</div>
    </div>
  ) : null;
};
