export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.06] py-6 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <a
          href="https://claude.com/claude-code"
          target="_blank"
          rel="noopener noreferrer"
          className="group text-black/25 dark:text-white/20 text-xs font-mono transition-colors"
        >
          Built with{' '}
          <span className="text-[#D97757] group-hover:text-[#c25d3c] transition-colors font-medium">Claude Code</span>
        </a>
        <span className="text-black/15 dark:text-white/10 text-xs font-mono">© 2026</span>
      </div>
    </footer>
  )
}
