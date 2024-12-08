"use client";
import React, { useState, useEffect, useMemo } from "react";
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
      <div className="grid grid-cols-5 grid-rows-5">
        <div className="flex justify-center items-center col-span-1 row-span-1">
          <Image
            src="/utcc_logo.png"
            alt="UTCC Logo"
            width={80}
            height={80}
            className="hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h1 className="grid col-span-4 place-items-center text-4xl md:text-6xl text-center hover:scale-110 transition-transform duration-300">
          UTCC Infirmary
        </h1>
        <div className="bg-white grid grid-cols-1 col-span-5 row-span-4 rounded-lg max-w-lg mx-auto p-14">
          <form onSubmit={onSubmit} className="grid text-center">
            <div className="mx-4">
              <h1 className="text-center text-2xl font-bold my-4 text-black">
                แบบฟอร์มบันทึกอาการ
              </h1>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <TextInput
                  type="number"
                  label="รหัสประจำตัว"
                  radius="md"
                  placeholder="กรอกรหัสประจำตัว"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full"
                  style={{ borderColor: "black" }}
                  inputMode="numeric"
                  maxLength={13}
                />
                <div className="flex justify-center items-center w-full">
                  <Button variant="filled" onClick={handleCheckStudentClick} className="w-full">
                    ตรวจสอบ
                  </Button>
                </div>
                {isStudentExists !== null && !isStudentExists && (
                  <div className="w-full space-y-4">
                    <TextInput
                      type="text"
                      radius="md"
                      label="ชื่อ-นามสกุล"
                      placeholder="ชื่อ-นามสกุล"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full"
                      style={{ borderColor: "black" }}
                    />

                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="student"
                          name="role"
                          value="นักศึกษา"
                          className="mr-2"
                          onChange={handleRoleChange}
                        />
                        <label htmlFor="student">นักศึกษา</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="staff"
                          name="role"
                          value="บุคลากร"
                          className="mr-2"
                          onChange={handleRoleChange}
                        />
                        <label htmlFor="staff">บุคลากร</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="outsider"
                          name="role"
                          value="บุคคลภายนอก"
                          className="mr-2"
                          onChange={handleRoleChange}
                        />
                        <label htmlFor="outsider">บุคคลภายนอก</label>
                      </div>
                    </div>
                  </div>
                )}
                {isStudentExists && (
                  <div className="">
                    <p className="text-gray-700 font-bold text-center">
                      ข้อมูล: ชื่อ {studentName}, สถานะ {role}
                    </p>
                  </div>
                )}
                <div className="w-full">
                  <MultiSelect
                    radius="md"
                    label="เลือกอาการ"
                    className="w-full mb-6"
                    placeholder="เลือกอาการ"
                    data={options}
                    value={selectedSymptoms}
                    onChange={handleSymptomChange}
                    style={{ maxWidth: '100%', whiteSpace: 'normal' }}
                  />
                  {selectedSymptoms.includes('12') && (
                    <div className="w-full mt-4">
                      <TextInput
                        radius="md"
                        label="หมายเหตุ"
                        placeholder="หมายเหตุ"
                        value={otherSymptom}
                        onChange={(e) => setOtherSymptom(e.target.value)}
                        className="w-full mb-10"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-center items-center w-full">
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