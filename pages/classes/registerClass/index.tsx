
import RegisterClassForm from "@/pages/components/ClassRegisterForm";

export default function RegisterStudentPage() {
    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded shadow">
                <h1 className="text-3xl font-semibold text-center mb-6">Register Class</h1>
                <RegisterClassForm />
            </div>
        </>
    );
}