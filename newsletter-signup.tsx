import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Mail, Github, Twitter, Facebook, Shield } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-6 pb-8">
          {/* Logo/Brand Mark */}
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Headlines */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Subscribe to Pulse</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Get the latest insights, tips, and exclusive content delivered straight to your inbox every week.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Sign-up Options */}
          <div className="space-y-3">
            <p className="text-xs text-gray-500 text-center font-medium">SIGN UP WITH</p>
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-11 border-gray-200 hover:border-gray-300">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="h-11 border-gray-200 hover:border-gray-300">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="h-11 border-gray-200 hover:border-gray-300">
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-500 font-medium">OR CONTINUE WITH EMAIL</span>
            </div>
          </div>

          {/* Email Form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium"
            >
              Subscribe Now
            </Button>
          </form>

          {/* Additional Links */}
          <div className="flex justify-center space-x-4 text-xs">
            <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
              Terms
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
              Privacy
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
              Help
            </a>
          </div>

          {/* Trust Indicator */}
          <div className="flex items-center justify-center space-x-2 pt-2">
            <Shield className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-500">We respect your privacy and never spam</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
