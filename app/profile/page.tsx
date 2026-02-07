import ProfileForm from "@/components/profile/ProfileForm";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-grey-50 pt-[var(--header-height)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar - 3 cols */}
            <div className="lg:col-span-3">
                <ProfileSidebar />
            </div>

            {/* Main Content - 9 cols */}
             <div className="lg:col-span-9">
                <ProfileForm />
             </div>
        </div>
      </div>
    </div>
  );
}
