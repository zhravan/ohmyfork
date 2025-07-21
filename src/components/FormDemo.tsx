import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
});

type FormData = z.infer<typeof schema>;

export default function FormDemo() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md p-4 border rounded">
      <h3 className="text-lg font-semibold">Form Example</h3>
      <div>
        <label className="block mb-1">Name</label>
        <input {...register('name')} className="input input-bordered w-full" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input {...register('email')} className="input input-bordered w-full" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}
