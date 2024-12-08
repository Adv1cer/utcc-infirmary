"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, TextInput, MultiSelect } from '@mantine/core';
import toast, { Toaster } from 'react-hot-toast';
import handlepatientFormSubmit from "@/components/Landingpage/Form/services/handleSubmit";
import handleCheckStudent from "@/components/Landingpage/Form/services/handleCheckStudent";
import options from "@/components/Landingpage/Form/services/symptomOption";
import { Dorsa, Open_Sans } from "next/font/google";

const english = Open_Sans({
  subsets: ["latin"],
  weight: "400",
});

export default function Form() {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [role, setRole] = useState("");
  const [isStudentExists, setIsStudentExists] = useState<boolean | null>(null);
  const [otherSymptom, setOtherSymptom] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const handleSymptomChange = (newSymptoms: string[]) => {
    const validSymptoms = newSymptoms.filter(
      (symptom) => typeof symptom === 'string' && symptom.trim() !== ''
    );
    try {
      setSelectedSymptoms(validSymptoms); // Update state
    } catch (error) {
      console.error('Error in handleSymptomChange:', error);
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const onSubmit = handlepatientFormSubmit({
    studentName,
    studentId,
    role,
    selectedSymptoms,
    otherSymptom,
    options,
  });

  const handleCheckStudentClick = () => {
    handleCheckStudent({
      studentId,
      setStudentName,
      setRole,
      setIsStudentExists,
      setLoading,
    });
  };

  useEffect(() => {
    console.log(handleCheckStudentClick);
  }, []);

  return (
    <section className={english.className}>
<<<<<<< HEAD
      <div className="flex flex-col items-center justify-center min-h-screen  p-4">
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-2 space-y-2 md:space-y-0">
          <Image
            src="/utcc_logo.png"
            alt="UTCC Logo"
            width={49}
            height={49}
            className="hover:scale-110 transition-transform duration-300"
          />
          <h1 className="text-4xl md:text-6xl text-center md:text-left flex hover:scale-110 transition-transform duration-300">UTCC Infirmary</h1>
        </div>
        <div className="bg-white text-black shadow-lg py-8 max-w-lg w-full rounded-full mt-8">
          <h1 className="text-center text-2xl font-bold mb-6 text-gray-700 ">
            แบบฟอร์มบันทึกอาการ
          </h1>
          <form onSubmit={onSubmit} className="mx-2 md:mx-8 mt-8 mb-2">
            <div className="mb-4">
              <label className="block text-gray-700 text-center font-bold text-lg">
                รหัสประจำตัว
              </label>
              <div className="flex flex-col md:flex-row items-center gap-2">
=======
      <div className="grid grid-cols-5 grid-rows-5">
        <Image
          src="/utcc_logo.png"
          alt="UTCC Logo"
          width={80}
          height={80}
          className="hover:scale-110 transition-transform duration-300"
        />
        <h1 className="grid col-span-4 place-items-center text-4xl md:text-6xl text-center hover:scale-110 transition-transform duration-300">
          UTCC Infirmary
        </h1>
        <div className="bg-white grid grid-col-5 grid-row-5 col-span-5 row-span-4 rounded-full">
          <form onSubmit={onSubmit} className="grid text-center">
            <div className="mx-10">
              <h1 className="text-center text-2xl font-bold my-4 text-black">
                แบบฟอร์มบันทึกอาการ
              </h1>
              <div className="grid grid-cols-2 items-center place-items-center space-y-2 mb-6">
>>>>>>> origin/main
                <TextInput
                  type="number"
                  label="รหัสประจำตัว"
                  radius="md"
                  placeholder="กรอกรหัสประจำตัว"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="grid w-full items-center col-span-2 px-14"
                  style={{ borderColor: "black" }}
                  inputMode="numeric"
                  maxLength={13}
                />
                <Button variant="filled" onClick={handleCheckStudentClick} className="w-full px-4 col-span-2">
                  ตรวจสอบ
                </Button>
                {isStudentExists !== null && !isStudentExists && (
                  <div className="col-span-2 w-full space-y-4 space-x-2">
                    <TextInput
                      type="text"
                      radius="md"
                      label="ชื่อ-นามสกุล"
                      placeholder="ชื่อ-นามสกุล"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="block w-full col-span-2 px-14"
                      style={{ borderColor: "black" }}
                    />

                    <input
                      type="radio"
                      id="student"
                      name="role"
                      value="นักศึกษา"
                      className=""
                      onChange={handleRoleChange}
                    />
                    <label htmlFor="student">นักศึกษา</label>

                    <input
                      type="radio"
                      id="staff"
                      name="role"
                      value="บุคลากร"
                      className=""
                      onChange={handleRoleChange}
                    />
                    <label htmlFor="staff">บุคลากร</label>

                    <input
                      type="radio"
                      id="outsider"
                      name="role"
                      value="บุคคลภายนอก"
                      className=""
                      onChange={handleRoleChange}
                    />
                    <label htmlFor="outsider">บุคคลภายนอก</label>
                  </div>
                )}
                {isStudentExists && (
                  <div className="">
                    <p className="text-gray-700 font-bold text-center">
                      ข้อมูล: ชื่อ {studentName}, สถานะ {role}
                    </p>
                  </div>
                )}
                <div className="col-span-2 w-full">
                  <MultiSelect
                    radius="md"
                    label="เลือกอาการ"
                    className="block w-full col-span-2 px-4 px-14 mb-6"
                    placeholder="เลือกอาการ"
                    data={options}
                    value={selectedSymptoms}
                    onChange={handleSymptomChange}
                    style={{ maxWidth: '100%', whiteSpace: 'normal' }}
                  />
                  {selectedSymptoms.includes('12') && (
                    <div className="col-span-2 w-full mt-4">
                      <TextInput
                        radius="md"
                        label="หมายเหตุ"
                        placeholder="หมายเหตุ"
                        value={otherSymptom}
                        onChange={(e) => setOtherSymptom(e.target.value)}
                        className="block w-full px-14 mb-10"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-center items-center col-span-2">
                  <Button type="submit" className="w-full md:w-auto">
                    ส่งข้อมูล
                  </Button>
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}