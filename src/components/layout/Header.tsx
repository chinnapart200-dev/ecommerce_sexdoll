import Link from "next/link";

const navLinks = ["HOME", "SHOP", "BLOG", "PAGES", "ELEMENTS", "BUY"] as const;

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16l4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M12 20.25s-7.5-4.55-9.4-8.6C.72 8.6 2.2 5.5 5.4 4.7c1.7-.4 3.5.13 4.8 1.42.14.14.27.29.4.45.13-.16.26-.31.4-.45 1.3-1.29 3.1-1.82 4.8-1.42 3.2.8 4.68 3.9 2.8 6.95-1.9 4.05-9.4 8.6-9.4 8.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path d="M12 12.5a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.5 20c1.4-3.1 4-4.8 7.5-4.8s6.1 1.7 7.5 4.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path d="M3.5 5h2l1.2 10.2a1.8 1.8 0 0 0 1.8 1.6h7.9a1.8 1.8 0 0 0 1.8-1.4l1.3-6.9H7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="20" r="1.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="20" r="1.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/70 backdrop-blur-md">
      <div className="border-b border-black/10 bg-white/70">
        <div className="mx-auto flex w-full max-w-[1520px] items-center justify-between px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#2d2d2d] sm:px-6 lg:px-10">
          <p>
            Free shipping on orders over <span className="text-[#7e9b00]">$99</span>
          </p>
          <div className="hidden gap-6 md:flex">
            <Link href="/" className="transition hover:text-black">
              En / Usd
            </Link>
            <Link href="/help" className="transition hover:text-black">
              Help
            </Link>
            <Link href="/orders" className="transition hover:text-black">
              Track order
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1520px] items-center gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/85 text-black transition hover:scale-105"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/85 text-black transition hover:scale-105"
          aria-label="Search"
        >
          <SearchIcon />
        </button>

        <Link href="/" className="text-3xl font-black uppercase tracking-[-0.08em] text-[#111111] sm:text-[2.8rem]">
          WOODMART
          <span className="text-[#ff42c5]">.</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link}
              href={index === 0 ? "/" : "#"}
              className={`group relative text-sm font-bold uppercase tracking-[0.22em] text-[#111111] transition hover:text-black ${
                index === 0 ? "after:absolute after:-bottom-2 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-[#ff42c5] after:content-['']" : ""
              }`}
            >
              {link}
              {index > 0 ? <span className="ml-1 text-[0.7rem] text-black/45">▾</span> : null}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/85" aria-label="Account">
            <UserIcon />
          </button>
          <button type="button" className="relative grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/85" aria-label="Wishlist">
            <HeartIcon />
            <span className="absolute right-0 top-0 grid h-5 w-5 place-items-center rounded-full bg-[#3f51ff] text-[10px] font-black text-white">1</span>
          </button>
          <button type="button" className="relative grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/85" aria-label="Cart">
            <CartIcon />
            <span className="absolute right-0 top-0 grid h-5 w-5 place-items-center rounded-full bg-[#d7ff1f] text-[10px] font-black text-black">2</span>
          </button>
          <div className="hidden text-sm font-semibold text-[#111111] sm:block">$245.00</div>
        </div>
      </div>
    </header>
  );
}

export default Header;

