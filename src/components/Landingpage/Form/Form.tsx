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
import { Open_Sans } from "next/font/google";

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
                <TextInput
                  radius="md"
                  placeholder="รหัสประจำตัว"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="block w-full p-2 pl-4"
                  style={{ borderColor: "black" }}
                />
                <Button variant="filled" onClick={handleCheckStudentClick}>
                  ตรวจสอบ
                </Button>
              </div>
              {isStudentExists !== null && !isStudentExists && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-center font-bold text-lg">
                      ชื่อ-นามสกุล
                    </label>
                    <TextInput
                      radius="md"
                      placeholder="ชื่อ-นามสกุล"
                      value={studentName}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="block w-full p-2 pl-4"
                      style={{ borderColor: "black" }}
                    />
                  </div>
                  <div className="flex justify-center gap-1 my-5">
                    <div className="mx-2">
                      <input
                        type="radio"
                        id="student"
                        name="role"
                        value="นักศึกษา"
                        className="mx-2"
                        onChange={handleRoleChange}
                      />
                      <label htmlFor="student">นักศึกษา</label>
                    </div>
                    <div className="mx-2">
                      <input
                        type="radio"
                        id="staff"
                        name="role"
                        value="บุคลากร"
                        className="mx-2"
                        onChange={handleRoleChange}
                      />
                      <label htmlFor="staff">บุคลากร</label>
                    </div>
                    <div className="mx-2">
                      <input
                        type="radio"
                        id="outsider"
                        name="role"
                        value="บุคคลภายนอก"
                        className="mx-2"
                        onChange={handleRoleChange}
                      />
                      <label htmlFor="outsider">บุคคลภายนอก</label>
                    </div>
                  </div>
                </>
              )}
              {isStudentExists && (
                <div className="mb-4">
                  <p className="text-gray-700 font-bold text-center">
                    ข้อมูล: ชื่อ {studentName}, สถานะ {role}
                  </p>
                </div>
              )}
              <MultiSelect
                radius="md"
                label="เลือกอาการ"
                className="block w-full p-2 pl-4 mt-4"
                placeholder="เลือกอาการ"
                data={options}
                value={selectedSymptoms}
                onChange={handleSymptomChange}
              />
            </div>
            {selectedSymptoms.includes('12') && (
              <div className="mt-4">
                <label className="block text-gray-700 text-center font-bold text-lg">
                  หมายเหตุ
                </label>
                <TextInput
                  radius="md"
                  placeholder="หมายเหตุ"
                  value={otherSymptom}
                  onChange={(e) => setOtherSymptom(e.target.value)}
                  className="mt-1 block w-full p-2 pl-4"
                />
              </div>
            )}
            <div className="flex justify-center">
              <Button type="submit" className="mt-4 w-full md:w-auto">
                ส่งข้อมูล
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}