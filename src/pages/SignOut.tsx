import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SignOut = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false);

  const { signOut } = useAuth();

  const handleSignOut = () => {
    setIsSigningOut(true);
    setTimeout(() => {
      signOut();
      setIsSigningOut(false);
      setIsSignedOut(true);
    }, 2000);
  };

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const handleSignInAgain = () => {
    window.location.href = "/signin";
  };

  if (isSignedOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-lg text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-green-800">Successfully Signed Out</CardTitle>
              <p className="text-sm text-gray-600">
                Thank you for using शिक्षा सेतु. Your learning session has ended.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  Keep learning, keep growing! 📚
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Your progress has been saved automatically
                </p>
              </div>
              
              <div className="space-y-2">
                <Button onClick={handleSignInAgain} className="w-full">
                  Sign In Again
                </Button>
                <Button onClick={handleBackToHome} variant="outline" className="w-full">
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">शिक्षा सेतु</h1>
          <p className="text-gray-600">Digital Learning Platform</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-xl">Sign Out</CardTitle>
            <p className="text-sm text-gray-600">
              Are you sure you want to end your learning session?
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Your progress will be saved automatically, 
                but you'll need to sign in again to continue learning.
              </p>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleSignOut} 
                variant="destructive" 
                className="w-full"
                disabled={isSigningOut}
              >
                {isSigningOut ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing Out...
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4 mr-2" />
                    Yes, Sign Me Out
                  </>
                )}
              </Button>
              
              <Button 
                onClick={handleBackToHome} 
                variant="outline" 
                className="w-full"
                disabled={isSigningOut}
              >
                Cancel
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-xs text-gray-500">
                Thank you for learning with शिक्षा सेतु! 🙏
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignOut;