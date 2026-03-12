import { useState, useRef, useCallback } from 'react';
import { useStore } from '../store';
import { isAIQuery, getAIResult, getSearchResult, getBrokenResult, regulars } from '../data/products';
import type { Product, AISearchResult } from '../data/products';
import RegularsRow from '../components/search/RegularsRow';
import RecentSearches from '../components/search/RecentSearches';
import ProductCard from '../components/search/ProductCard';
import AISearchResults from '../components/search/AISearchResults';

export default function SearchPage() {
  const { searchMode, addRecentSearch } = useStore();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<{ organic: Product[]; sponsored: Product[] } | null>(null);
  const [aiResult, setAiResult] = useState<AISearchResult | null>(null);
  const [brokenResults, setBrokenResults] = useState<Product[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Broken mode: simulate dropping keystrokes
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (searchMode === 'broken') {
      // Drop ~40% of keystrokes randomly, plus add 200ms visual lag
      if (Math.random() < 0.4 && value.length > query.length) {
        // Swallow the keystroke
        return;
      }
    }

    setQuery(value);
    setShowSuggestions(value.length > 0);

    // Debounced search
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, searchMode === 'broken' ? 100 : 300); // Broken mode: aggressive autocomplete
  }, [searchMode, query]);

  const performSearch = (q: string) => {
    if (!q.trim()) {
      setSearchResults(null);
      setAiResult(null);
      setBrokenResults(null);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setShowSuggestions(false);

    // Simulate loading
    setTimeout(() => {
      if (searchMode === 'fixed' && isAIQuery(q)) {
        const ai = getAIResult(q);
        setAiResult(ai);
        setSearchResults(null);
        setBrokenResults(null);
      } else if (searchMode === 'broken' && isAIQuery(q)) {
        // Broken mode for recipe queries: show flat list of irrelevant packaged products
        const broken = getBrokenResult(q);
        setBrokenResults(broken);
        setSearchResults(null);
        setAiResult(null);
      } else {
        const results = getSearchResult(q);
        if (results && searchMode === 'broken') {
          // Broken mode: show sponsored first
          setSearchResults({ organic: results.sponsored, sponsored: results.organic });
        } else {
          setSearchResults(results);
        }
        setAiResult(null);
        setBrokenResults(null);
      }
      setIsSearching(false);
      setHasSearched(true);
      addRecentSearch(q);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    performSearch(query);
  };

  const handleSuggestionSelect = (q: string) => {
    setQuery(q);
    setShowSuggestions(false);
    performSearch(q);
  };

  // Suggestion list from regulars + recent that match query
  const suggestions = query.length > 0
    ? regulars
        .filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
        .map(r => r.name)
        .slice(0, 4)
    : [];

  const borderColor = searchMode === 'broken' ? 'border-error' : 'border-success';

  return (
    <div className="pb-20">
      {/* Search bar */}
      <form onSubmit={handleSubmit} className="sticky top-[52px] z-30 bg-bg px-4 py-3">
        <div className={`relative flex items-center bg-white rounded-xl border-2 ${borderColor} transition-colors`}>
          <span className="pl-3 text-body">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInput}
            onFocus={() => query.length > 0 && setShowSuggestions(true)}
            placeholder="Search for groceries..."
            className="flex-1 py-3 px-2 text-sm bg-transparent outline-none text-dark placeholder:text-body/50"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); setSearchResults(null); setAiResult(null); setBrokenResults(null); setHasSearched(false); }}
              className="pr-3 text-body"
            >
              ✕
            </button>
          )}
        </div>

        {/* Mode indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${searchMode === 'broken' ? 'bg-error' : 'bg-success'}`} />
          <span className="text-[10px] text-body">
            {searchMode === 'broken' ? 'Simulating broken PC Express search' : 'Fixed search — AI enabled'}
          </span>
        </div>

        {/* Autocomplete suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-4 right-4 top-[60px] bg-white rounded-lg border border-border shadow-lg z-40">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionSelect(s)}
                className="w-full text-left px-4 py-2.5 text-sm text-dark border-b border-border last:border-0 hover:bg-bg transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Home content (no search yet) */}
      {!hasSearched && !isSearching && (
        <>
          <RegularsRow />
          <RecentSearches onSelect={handleSuggestionSelect} />
        </>
      )}

      {/* Loading skeleton */}
      {isSearching && (
        <div className="px-4 grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-card rounded-lg border border-border p-3 animate-pulse">
              <div className="h-10 bg-bg rounded mb-2" />
              <div className="h-3 bg-bg rounded w-3/4 mb-1" />
              <div className="h-3 bg-bg rounded w-1/2 mb-2" />
              <div className="h-8 bg-bg rounded" />
            </div>
          ))}
        </div>
      )}

      {/* AI search results */}
      {aiResult && !isSearching && <AISearchResults result={aiResult} />}

      {/* Broken mode: flat list of irrelevant packaged products */}
      {brokenResults && !isSearching && (
        <div className="px-4 pb-24">
          <div className="bg-error-light rounded-lg p-3 mb-4 animate-fade-in">
            <p className="text-xs text-error font-medium">
              Showing {brokenResults.length} results for "{query}" — no smart grouping, mostly packaged products
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {brokenResults.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Standard search results */}
      {searchResults && !isSearching && (
        <div className="px-4 pb-24">
          {searchResults.organic.length > 0 && (
            <>
              <h3 className="text-xs font-semibold text-body uppercase tracking-wider mb-2">
                {searchMode === 'broken' ? 'Sponsored' : 'Results'}
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {searchResults.organic.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </>
          )}

          {searchResults.sponsored.length > 0 && (
            <>
              <div className="border-t border-border my-3" />
              <h3 className="text-xs font-semibold text-sponsored uppercase tracking-wider mb-2">
                {searchMode === 'broken' ? 'Results' : 'Sponsored'}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {searchResults.sponsored.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </>
          )}

          {searchResults.organic.length === 0 && searchResults.sponsored.length === 0 && (
            <div className="text-center py-12">
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-sm text-body">No results for "{query}"</p>
              <p className="text-xs text-body mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      )}

      {/* No results */}
      {hasSearched && !isSearching && !searchResults && !aiResult && !brokenResults && (
        <div className="text-center py-12 px-4">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-sm text-body">No results for "{query}"</p>
          <p className="text-xs text-body mt-1">Try: chicken, milk, "thai green curry", "pizza", "red sauce pasta", or "stuff for tacos"</p>
        </div>
      )}
    </div>
  );
}
