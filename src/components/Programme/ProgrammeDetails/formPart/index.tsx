import SupportForm from "@/components/Common/SupportForm";

const FormPart = () => {
  return (
    <div className="bg-grey dark:bg-darkmode px-8 py-10 rounded-sm border border-border dark:border-dark_border mb-8">
      <h4 className="text-xl font-bold text-midnight_text dark:text-white mb-2">Support This Cause</h4>
      <p className="text-sm text-muted dark:text-white/60 mb-6">
        Every contribution — financial, in-kind, or through volunteering — makes a direct difference to the
        individuals and families we serve.
      </p>
      <SupportForm />
    </div>
  );
};

export default FormPart;