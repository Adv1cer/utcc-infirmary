import toast from 'react-hot-toast';

interface HandlePatientFormSubmitProps {
  studentName: string;
  studentId: string;
  role: string;
  selectedSymptoms: string[];
  otherSymptom: string;
  options: { value: string; label: string }[];
}

const handlepatientFormSubmit = ({
  studentName,
  studentId,
  role,
  selectedSymptoms,
  otherSymptom,
  options,
}: HandlePatientFormSubmitProps) => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const confirmMessage = `
      ยืนยันข้อมูล:
      ชื่อ-นามสกุล: ${studentName}
      รหัสนักศึกษา: ${studentId}
      สถานะ: ${role}
      อาการ: ${selectedSymptoms
        .map((symptom) => options.find((option) => option.value === symptom)?.label)
        .join(", ")}
      ${
        selectedSymptoms.includes('12')
          ? `หมายเหตุ: ${otherSymptom}`
          : ""
      }
    `;

    if (!window.confirm(confirmMessage)) return;

    const formData = {
      student_id: studentId,
      student_name: studentName,
      role,
      symptom_ids: selectedSymptoms,
      other_symptom: selectedSymptoms.includes('12') ? otherSymptom : "",
    };

    try {
      const response = await fetch("/api/formpage/form/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("บันทึกข้อมูลสำเร็จ");
        location.reload();
      } else {
        toast.error("ไม่สามารถบันทึกข้อมูลได้");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  return onSubmit;
};

export default handlepatientFormSubmit;