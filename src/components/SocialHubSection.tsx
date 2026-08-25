import React, { useState } from 'react';
import { Heart, Instagram, MessageCircle, Play, Sparkles, Share2 } from 'lucide-react';
import { SOCIAL_POSTS } from '../data/mockData';
import { soundEffects } from '../utils/soundEffects';

export const SocialHubSection: React.FC = () => {
  const [posts, setPosts] = useState(SOCIAL_POSTS);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

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
    <section id="social" className="py-24 bg-[#FDF8F2] relative overflow-hidden border-t border-[#4A2C2A]/10">
      
      {/* Decorative Glow */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#D2916C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header with Bold Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#4A2C2A]/10 mb-4 shadow-xs">
            <Instagram className="w-3.5 h-3.5 text-[#D2916C]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#D2916C]">
              #StickDipLove • @dripstick.official
            </span>
          </div>
          <h2 className="font-brand font-black text-4xl sm:text-5xl lg:text-6xl text-[#4A2C2A] tracking-tight mb-4">
            THE DRIP COMMUNITY
          </h2>
          <p className="text-base sm:text-lg text-[#4A2C2A]/80 leading-relaxed font-medium">
            Tag us in your messy, chocolate-dripping reels and stories for a chance to win Free DripSticks for a Month.
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
                className="group rounded-3xl bg-white border border-[#4A2C2A]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
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
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white">
                      <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                    </div>
                  )}

                  {/* Creator Handle */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#D2916C] text-white flex items-center justify-center font-bold text-[10px]">
                      {post.author.charAt(1).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-white drop-shadow-xs">
                      {post.author}
                    </span>
                  </div>
                </div>

                {/* Caption & Stats */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-[#4A2C2A]/80 leading-relaxed line-clamp-2">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#4A2C2A]/10 text-xs">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 font-bold transition-colors text-[#4A2C2A]"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isLiked
                            ? 'fill-rose-500 text-rose-500 animate-ping'
                            : 'text-[#4A2C2A]/60 group-hover:text-rose-500'
                        }`}
                      />
                      <span>{post.likes}</span>
                    </button>

                    <div className="flex items-center gap-1 text-[#4A2C2A]/60">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.comments}</span>
                    </div>

                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase font-bold text-[#D2916C] hover:underline"
                    >
                      View Reel &rarr;
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Banner */}
        <div className="rounded-3xl bg-[#4A2C2A] text-[#FDF8F2] p-8 text-center max-w-2xl mx-auto shadow-xl">
          <h3 className="font-brand font-black text-2xl sm:text-3xl mb-2">
            Join the #StickDipLove Movement
          </h3>
          <p className="text-xs text-[#FDF8F2]/80 max-w-md mx-auto mb-6">
            Follow @dripstick.official on Instagram & TikTok for secret weekly menu drops, campus popup alerts, and VIP tasting passes.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D2916C] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#c2805b] transition-colors shadow-md"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
};
