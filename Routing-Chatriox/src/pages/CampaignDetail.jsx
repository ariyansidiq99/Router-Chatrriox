import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

const CampaignDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        Promis.all([
                fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,          { signal: controller.signal }),
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, { signal: controller.signal }),
    ]).then(([postRes, commentRes]) => {
        if(!postRes.ok) throw Error("Campaign not found");
        return Promise.all([postRes.json(), commentRes.json()]);
    })
    .then(([postData, commentsData]) => {
        setPost(postData);
        setComments(commentsData);
    })
    .catch(err => {
        if(err.name !== "AbortError") setError(err.message)
    }).finally ( () => setLoading(false))
return () => controller.abort();
    }, [id]);

    if(loading) return <div className="loading">Loading campaign {id}...</div>
    if(error) return (
        <div className="error-page container">
            <h2>Campaign Not Found</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/campaigns')} className="btn btn-primary">Back to campaigns</button>
        </div>
    )
  return (
    <div className="campaign-detail container">
        <div className="breadcrumb">
            <Link to='/campaigns'>Campaigns</Link>
            <span>/</span>
            <span>Campaign #{id}</span>
        </div>
        <h1 className="campaign-detail title">{post.title}</h1>
        <p className="campaign-detail body">{post.body}
        </p>

        <div className="campaign-detail stats">
            <div className="stat"><strong>{Math.floor(Math.random() * 5000) + 500}</strong><span>Sent </span></div>
            <div className="stat"><strong>{Math.floor(Math.random() * 40) + 60}%</strong><span>Open Rate</span></div>
            <div className="stat"><strong>{comments.length}</strong><span>Responses</span></div>
        </div>
        <h2>Responses ({comments.length})</h2>
        <div className="comments">
            {comments.map(comment => (
                <div className="comment" key={comment.id}>
                    <div className="comment author">
                        {comment.email}
                    </div>
                    <p className='comment-body'>{comment.body}</p>
                </div>
            ))}
        </div>
        <div className="campaign-detail nav">
            {Number(id) > 1 && (
                <Link className="btn btn--outline" to={`/campaigns/${Number(id) - 1}`}>
                    Previous Campaign
                </Link>
            )}
            <Link className="btn-btn--outline" to={`/campaigns/${Number(id) + 1}`}>
            Next Campaign
                 </Link>
        </div>
    </div>
  )
}

export default CampaignDetail