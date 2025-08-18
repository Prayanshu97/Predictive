import React from 'react'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-secondary/10 via-primary/5 to-secondary/10 dark:from-secondary/20 dark:via-primary/10 dark:to-secondary/20 backdrop-blur border-t border-border/40 dark:border-gray-700/40 mt-12 sm:mt-16 lg:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-end">
          {/* Logo and Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">AI</span>
              </div>
              <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Predictive
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Revolutionizing healthcare with AI-powered diagnostics and personalized health insights.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="text-center sm:col-span-2 lg:col-span-1">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Disclaimer:</strong> This information is AI-generated and for informational purposes only. 
              Consult a healthcare professional before taking any medication or making medical decisions.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center sm:text-right sm:col-span-2 lg:col-span-1">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2025 Predictive. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
              <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer