import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bookmark,
  Search,
  FolderOpen,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  Globe,
  Heart,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

const features = [
  {
    icon: Bookmark,
    title: 'Save Anything',
    desc: 'Save links from anywhere with automatic title, description, and preview fetching.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: FolderOpen,
    title: 'Organize Smart',
    desc: 'Create collections, add tags, and categorize your bookmarks effortlessly.',
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    icon: Search,
    title: 'Find Instantly',
    desc: 'Powerful full-text search across titles, descriptions, tags, and URLs.',
    color: 'from-chart-1 to-chart-5',
  },
  {
    icon: BarChart3,
    title: 'Track Analytics',
    desc: 'See your most visited links, click counts, and bookmark statistics.',
    color: 'from-chart-4 to-amber-600',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    desc: 'Your bookmarks are encrypted and only accessible by you.',
    color: 'from-chart-3 to-rose-600',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Built with modern tech for blazing fast performance and instant loading.',
    color: 'from-chart-2 to-primary-600',
  },
];

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-4 border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
            <Bookmark className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground font-sans">Stashly</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn-primary !h-9 text-xs font-semibold rounded-lg gap-1.5">
              Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-ghost !h-9 text-xs font-semibold rounded-lg">Log In</Link>
              <Link to="/register" className="btn-primary !h-9 text-xs font-semibold rounded-lg gap-1.5">
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 lg:px-12 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            {/* Headline with Outfit (sans) + Merriweather (serif italic) pairing */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 max-w-4xl mx-auto leading-[1.12]">
              Every link that matters, <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-primary">curated</span> in one quiet place.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
              Stop losing important resources across tabs and chats. Stashly organizes your bookmarks with instant search, custom collections, and reading analytics.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="btn-primary !h-11 !px-6 text-sm font-semibold rounded-lg shadow-sm gap-2 w-full sm:w-auto"
              >
                <Zap className="w-4 h-4" />
                Start Saving — It's Free
              </Link>
              <a
                href="#features"
                className="btn-outline !h-11 !px-6 text-sm font-semibold rounded-lg gap-2 w-full sm:w-auto"
              >
                <Globe className="w-4 h-4 text-muted-foreground" />
                Explore Features
              </a>
            </div>

            {/* Micro spec items in Fira Code */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-muted-foreground mt-8">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary" /> Auto metadata & favicon
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary" /> Lightning full-text search
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary" /> 100% private & secure
              </span>
            </div>
          </motion.div>

          {/* Clean App Mockup Window (No ambient blur, crisp borders) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-14 max-w-3xl mx-auto text-left"
          >
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              {/* Window title bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground ml-2 hidden sm:inline">stashly.app/my-library</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-7 px-2.5 bg-input border border-border rounded-md flex items-center gap-2 text-xs text-muted-foreground">
                    <Search className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[11px] font-sans">Search bookmarks...</span>
                    <kbd className="font-mono text-[10px] bg-card px-1.5 py-0.5 rounded border border-border text-muted-foreground ml-1">⌘K</kbd>
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-md">
                    <Bookmark className="w-3 h-3" /> New
                  </div>
                </div>
              </div>

              {/* Mock bookmark items */}
              <div className="p-3 sm:p-4 space-y-2.5">
                {[
                  {
                    title: 'React 19 Official Documentation & Actions',
                    url: 'react.dev/blog/react-19',
                    tag: 'Frontend',
                    time: 'Saved 2h ago',
                  },
                  {
                    title: 'Tailwind CSS v4 Engine Deep Dive',
                    url: 'tailwindcss.com/docs/v4-beta',
                    tag: 'Design',
                    time: 'Saved yesterday',
                  },
                  {
                    title: 'Distributed Systems & Data Architecture Patterns',
                    url: 'martinfowler.com/articles/patterns',
                    tag: 'Architecture',
                    time: 'Saved 3d ago',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg bg-input/40 hover:bg-input border border-border/60 hover:border-border transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-card border border-border flex items-center justify-center flex-shrink-0 text-primary">
                        <Bookmark className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-card-foreground truncate group-hover:text-primary transition-colors font-sans">
                          {item.title}
                        </p>
                        <p className="text-[11px] font-mono text-muted-foreground truncate">{item.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span className="tag-chip font-mono text-[10px] hidden sm:inline-flex">{item.tag}</span>
                      <span className="text-[11px] font-mono text-muted-foreground hidden md:inline">{item.time}</span>
                      <Heart className="w-3.5 h-3.5 text-muted-foreground group-hover:text-destructive transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 lg:px-12 py-24 bg-card/40 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-primary font-semibold mb-2">Capabilities</p>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 font-sans">
              Everything you need to stay <span className="font-serif italic font-normal text-primary">organized</span>.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
              Powerful features to help you save, organize, and rediscover your important links.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 hover:shadow-md transition-all duration-300 group"
              >
                <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-card-foreground mb-2 font-sans">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-card border border-border rounded-2xl p-10 lg:p-14 shadow-sm">
            <h2 className="text-3xl lg:text-4xl font-bold text-card-foreground mb-4 font-sans">
              Ready to organize your links with <span className="font-serif italic font-normal text-primary">clarity</span>?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto font-sans">
              Join thousands of users who trust Stashly to manage their bookmarks efficiently.
            </p>
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="btn-primary !h-11 !px-8 text-sm font-semibold rounded-lg inline-flex items-center gap-2 shadow-sm"
            >
              Get Started for Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <Bookmark className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-semibold text-foreground font-sans">Stashly</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            © {new Date().getFullYear()} Stashly. Built with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
