import React from 'react'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-secondary/10 via-primary/5 to-secondary/10 dark:from-secondary/20 dark:via-primary/10 dark:to-secondary/20 backdrop-blur border-t border-border/40 dark:border-gray-700/40 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                HealthAI
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Revolutionizing healthcare with AI-powered diagnostics and personalized health insights.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-xl p-4 border border-border/50 dark:border-gray-700/50 shadow-modern">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Disclaimer:</strong> This information is AI-generated and for informational purposes only. 
                Consult a healthcare professional before taking any medication or making medical decisions.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © 2025 HealthAI. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end space-x-4 mt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
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