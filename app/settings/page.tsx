import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-grey-50 pt-[var(--header-height)]">
       <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <ProfileSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
               <div className="bg-white rounded-lg shadow-sm border border-grey-200 divide-y divide-grey-200">
                  <div className="p-6">
                    <h2 className="header-05-bold text-grey-900 mb-4">Notifications</h2>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-grey-900">Email Notifications</p>
                        <p className="text-sm text-grey-500">Receive emails about upcoming trips and offers</p>
                      </div>
                      <button className="bg-primary-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2">
                        <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                      </button>
                    </div>
                  </div>
                  
                   <div className="p-6">
                    <h2 className="header-05-bold text-grey-900 mb-4">Account</h2>
                     <div className="space-y-4">
                       <button className="text-primary-600 font-medium hover:text-primary-700">Change Password</button>
                       <br/>
                       <button className="text-red-600 font-medium hover:text-red-700">Delete Account</button>
                     </div>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
