import Modal from './Modal';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', danger = true }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || 'Confirm Action'} maxWidth="max-w-md">
      <p className="text-muted-foreground mb-6">{message || 'Are you sure? This action cannot be undone.'}</p>
      <div className="flex items-center justify-end gap-2.5">
        <button onClick={onClose} className="btn-outline !h-9 text-xs font-semibold rounded-lg">
          Cancel
        </button>
        <button onClick={onConfirm} className={danger ? 'btn-danger !h-9 text-xs font-semibold rounded-lg' : 'btn-primary !h-9 text-xs font-semibold rounded-lg'}>
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
