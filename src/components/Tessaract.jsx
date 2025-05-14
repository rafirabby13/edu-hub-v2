import React from "react";
import { useForm } from "react-hook-form";
import { createWorker } from 'tesseract.js';



const Tessaract = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data.firstName[0])


      const worker = await createWorker('eng');
  const ret = await worker.recognize(data.firstName[0]);
  console.log(ret.data.text);
  await worker.terminate();
};
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("firstName")} />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Tessaract;
