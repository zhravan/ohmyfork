import React from 'react';
import FormDemo from '../components/FormDemo';
import TableDemo from '../components/TableDemo';
import DialogDemo from '../components/DialogDemo';
import ChartDemo from '../components/ChartDemo';
import MarkdownDemo from '../components/MarkdownDemo';
import ConfettiButton from '../components/ConfettiButton';
import IconDemo from '../components/IconDemo';

export default function Demo() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Demo Components</h2>
      <FormDemo />
      <TableDemo />
      <DialogDemo />
      <ChartDemo />
      <MarkdownDemo />
      <ConfettiButton />
      <IconDemo />
    </div>
  );
}
