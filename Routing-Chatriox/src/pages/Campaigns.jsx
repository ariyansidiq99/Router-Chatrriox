import React, { useEffect, useState } from 'react';
import {Link, useSearchParams} from "react-router-dom"

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const channel = searchParams.get("channel") || 'all';

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts?_limit=20").then(r => r.json()).then(data => {
            const enriched = data.map((p, i) => ({
                    ...p,
          channel:  i % 2 === 0 ? 'whatsapp' : 'email',
          sent:     Math.floor(Math.random() * 5000) + 500,
          openRate: Math.floor(Math.random() * 40) + 60,
          status:   ['active','completed','draft'][i % 3],
            }));
            setCampaigns(enriched);
            setLoading(false);
        })
    }, []);

    const filtered = channel === "all" ? campaigns : campaigns.filter(c => c.channel === channel);
    
    if(loading) return <div className="loading">Loading Campaigns...</div>

  return (
    <div className='campaigns-page container'>
      <div className="page-header">
        <h1>Campaigns</h1>
        <div className="filters">
          {['all', 'whatsapp', 'email'].map(f => (
            <button className={`filter-btn ${channel === f ? 'is-active' : ''}`} key={f} onClick={() => setSearchParams(f === 'all' ? {} : {channel : f})}>
              {f === 'all' ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="campaigns-grid">
        {filtered.map(campaign => (
          <Link key={campaign.id}
          to={`/campaigns/${campaign.id}`}
          className='campaing-card'>
            <div className="campaign-card_header">
              <span className={`badge badge--${campaign.channel}`}>
                {campaign.channel}
              </span>
              <span className={`status status--${campaign.status}`}>
                {campaign.status}
              </span>
            </div>
            <h3 className="campaign-card title">{campaign.title}</h3>
            <div className="campaign-card status">
              <span>{campaign.sent.toLocalString()} Sent</span>
              <span>{campaign.openRate}% open rate</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Campaigns