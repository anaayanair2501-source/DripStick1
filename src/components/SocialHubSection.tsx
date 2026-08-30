import React, { useState } from 'react';
import { Heart, Instagram, MessageCircle, Play, Sparkles, Share2, Flame, Award } from 'lucide-react';
import { SOCIAL_POSTS } from '../data/mockData';
import { soundEffects } from '../utils/soundEffects';

export const SocialHubSection: React.FC = () => {
  const [posts, setPosts] = useState(SOCIAL_POSTS);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [activeStory, setActiveStory] = useState<string | null>(null);

  const handleLike = (id: string) => {
    soundEffects.playDip();
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter((p) => p !== id));
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, likes: p.likes - 1 } : p))
      );
    } else {
      setLikedPosts([...likedPosts, id]);
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
      );
    }
  };

  return (
    <section id="social" className="py-24 bg-[#FAF5EE] relative overflow-hidden border-t border-[#4A2C2A]/10">
      
      {/* Decorative Pastel Ambient Light */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-bl from-[#FCE7F3]/40 to-[#E0E7FF]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-[#FEF3C7]/40 to-[#DCFCE7]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header with Bold Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCE7F3] border border-[#FBCFE8] mb-4 shadow-2xs">
            <Instagram className="w-3.5 h-3.5 text-[#DB2777]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9D174D]">
              #StickDipLove • @dripstick.official
            </span>
          </div>
          <h2 className="font-brand font-black text-4xl sm:text-5xl lg:text-6xl text-[#4A2C2A] tracking-tight mb-4">
            THE DRIP COMMUNITY
          </h2>
          <p className="text-base sm:text-lg text-[#4A2C2A]/80 leading-relaxed font-medium">
            Tag us in your messy, chocolate-dripping reels and stories for a chance to win Free DripSticks for a Month. 🍫✨
          </p>
        </div>

        {/* Social Grid (Reels & User Photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {posts.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            return (
              <div
                key={post.id}
                id={`social-card-${post.id}`}
                className="group rounded-3xl bg-white border border-[#4A2C2A]/10 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Media Image / Video Thumbnail */}
                <div className="relative h-64 w-full bg-[#4A2C2A] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#26140A]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Reel Indicator */}
                  {post.type === 'reel' && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#DB2777] font-black text-[10px] flex items-center gap-1 shadow-sm">
                      <Play className="w-3 h-3 fill-[#DB2777] text-[#DB2777]" />
                      <span>REEL</span>
                    </div>
                  )}

                  {/* Creator Handle */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F472B6] to-[#FB7185] text-white flex items-center justify-center font-black text-[11px] shadow-xs">
                      {post.author.charAt(1).toUpperCase()}
                    </div>
                    <span className="text-xs font-black text-white drop-shadow-xs">
                      {post.author}
                    </span>
                  </div>
                </div>

                {/* Caption & Stats */}
                <div className="p-4 space-y-3 bg-[#FCF9F5]">
                  <p className="text-xs text-[#4A2C2A]/85 leading-relaxed line-clamp-2 font-medium">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#4A2C2A]/10 text-xs">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 font-extrabold transition-all text-[#4A2C2A] hover:scale-105"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isLiked
                            ? 'fill-rose-500 text-rose-500 scale-125'
                            : 'text-[#4A2C2A]/60 group-hover:text-rose-500'
                        }`}
                      />
                      <span className={isLiked ? 'text-rose-600 font-black' : ''}>{post.likes}</span>
                    </button>

                    <div className="flex items-center gap-1 text-[#4A2C2A]/60 font-semibold">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.comments}</span>
                    </div>

                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase font-black text-[#DB2777] hover:underline"
                    >
                      View Reel &rarr;
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Banner with Pastel Gradient */}
        <div className="rounded-3xl bg-gradient-to-r from-[#4A2C2A] via-[#3B2220] to-[#2E1816] text-[#FDF8F2] p-8 sm:p-10 text-center max-w-3xl mx-auto shadow-2xl border-2 border-white/10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F472B6]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FDE68A] text-[10px] font-black uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3 text-[#FDE68A]" />
            <span>Weekly Giveaway</span>
          </div>
          
          <h3 className="font-brand font-black text-2xl sm:text-4xl mb-2 text-white">
            Join the #StickDipLove Movement
          </h3>
          <p className="text-xs sm:text-sm text-[#FDF8F2]/80 max-w-md mx-auto mb-6 leading-relaxed">
            Follow @dripstick.official on Instagram & TikTok for secret weekly menu drops, campus popup alerts, and VIP tasting passes.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#F472B6] to-[#FB7185] text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
};
