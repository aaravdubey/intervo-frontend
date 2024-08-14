export default function Modal({ isModalOpen, setIsModalOpen, heading, text, confirmText, cancelText, onConfirm, onCancel }) {
  return (
    <div className={`${isModalOpen ? 'fixed' : 'hidden'} z-10 inset-0 overflow-y-auto`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}>
          <div className="absolute inset-0 bg-slate-500 bg-opacity-50"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Accept Interview Batch?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Once confirmed, you can't cancel the scheduled interview. So, please confirm only when you are sure of the scheduled dates.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-blue text-base font-medium text-white hover:bg-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue sm:ml-3 sm:w-auto sm:text-sm" onClick={onConfirm}>
              Yes, Accept
            </button>
            <button
              type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-light-blue text-base font-medium text-gray-800 hover:bg-light-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsModalOpen(false)}>
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
