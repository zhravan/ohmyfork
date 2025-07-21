import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export default function DialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Dialog Example</h3>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="btn btn-secondary">Open Dialog</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
          <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-6 rounded shadow-lg">
            <Dialog.Title className="font-bold mb-2">Dialog Title</Dialog.Title>
            <Dialog.Description className="mb-4">This is a Radix UI dialog example.</Dialog.Description>
            <button className="btn btn-primary" onClick={() => setOpen(false)}>
              Close
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
