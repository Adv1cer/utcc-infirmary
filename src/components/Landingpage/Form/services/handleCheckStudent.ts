import toast from 'react-hot-toast';

interface HandleCheckStudentProps {
  studentId: string;
  setStudentName: (name: string) => void;
  setRole: (role: string) => void;
  setIsStudentExists: (exists: boolean) => void;
  setLoading: (loading: boolean) => void;
}

const handleCheckStudent = async ({
  studentId,
  setStudentName,
  setRole,
  setIsStudentExists,
  setLoading,
}: HandleCheckStudentProps): Promise<void> => {
  if (!studentId.trim()) {
    toast.error("กรุณากรอกรหัสนักศึกษา");
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(`/api/formpage/check_id?patient_id=${studentId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log(data);

      if (data.exists) {
        setStudentName(data.patient_name);
        setRole(data.role);
        setIsStudentExists(true);
        toast.success("ข้อมูลนักศึกษาถูกต้อง");
      } else {
        setIsStudentExists(false);
        setStudentName("");
        setRole("");
        toast.error("ไม่พบข้อมูลนักศึกษา");
      }
    } else {
      throw new Error("Invalid content type. Expected JSON.");
    }
  } catch (error) {
    console.error("Error checking student:", error);
    toast.error("ไม่สามารถตรวจสอบข้อมูลได้");
  } finally {
    setLoading(false);
  }
};

export default handleCheckStudent;