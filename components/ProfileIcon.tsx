interface ProfileIconProps {
  user: {
    user_metadata: {
      custom_claims: {
        global_name: string;
      };
    };
  };
}

export default async function ProfileIcon() {
  return (
    <div className="flex items-center gap-2">
      <h1>{}</h1>
      <img src={""} alt="Profile Picture" className="w-8 h-8 rounded-full" />
      <span className="text-lg font-semibold"></span>
    </div>
  );
}
