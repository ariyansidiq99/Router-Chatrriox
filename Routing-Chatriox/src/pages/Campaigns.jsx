import useFetch    from '../hooks/useFetch';
import useToggle   from '../hooks/useToggle';
import useDebounce from '../hooks/useDebounce';

function Campaigns() {
  const { data: rawCampaigns, loading, error, refetch } =
    useFetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
  const [search, setSearch]      = useState('');
  const debouncedSearch          = useDebounce(search, 300);
  const [showFilters, toggleFilters] = useToggle(false);

  const campaigns = rawCampaigns?.filter(c =>
    c.title.includes(debouncedSearch)
  ) ?? [];

  if (loading) return <div>Loading...</div>;
  if (error)   return <div>Error: {error} <button onClick={refetch}>Retry</button></div>;

  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Search...' />
      <button onClick={toggleFilters}>{showFilters ? 'Hide' : 'Show'} Filters</button>
      {showFilters && <div className='filters'>...</div>}
      {campaigns.map(c => <CampaignCard key={c.id} campaign={c} />)}
    </div>
  );
}
