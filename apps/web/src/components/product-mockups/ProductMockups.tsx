import {
  Activity,
  Bell,
  Bot,
  Box,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  GraduationCap,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  MessageSquareText,
  PackageCheck,
  Play,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import type { ProductInterfaceType } from "@/types/products";

function Shell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="product-window">
      <div className="product-window__bar">
        <span className="product-window__brand"><span aria-hidden="true" /> Growblic {label}</span>
        <span className="product-window__mode">Workspace / Live</span>
      </div>
      {children}
    </div>
  );
}

function AIDeskMockup() {
  return (
    <Shell label="AI Desk">
      <div className="desk-ui">
        <aside className="mock-sidebar">
          <div className="mock-sidebar__title"><MessageSquareText size={15} /> Workspace</div>
          <button className="is-current" type="button"><Mail size={14} /> Inbox <span>8</span></button>
          <button type="button"><Sparkles size={14} /> AI queue <span>3</span></button>
          <button type="button"><Users size={14} /> Assigned</button>
        </aside>
        <div className="desk-chat">
          <div className="desk-chat__header">
            <div><strong>Demo conversation</strong><span>Sample customer · Plan question</span></div>
            <span className="mock-status"><i /> AI assisting</span>
          </div>
          <div className="desk-chat__body">
            <div className="chat-message chat-message--customer">Could you help me update my plan?</div>
            <div className="chat-message chat-message--ai"><Bot size={14} /> I can help with that. Here is a suggested next step for review.</div>
            <div className="desk-suggestion"><Sparkles size={13} /> Suggested reply ready</div>
          </div>
          <div className="desk-composer"><span>Write a response...</span><button aria-label="Send demo response" type="button"><Send size={14} /></button></div>
        </div>
        <aside className="desk-context">
          <span className="mock-kicker">Customer context</span>
          <CircleUserRound size={28} />
          <strong>Demo contact</strong><span>Sample profile</span>
          <dl><div><dt>Access</dt><dd>Protected</dd></div><div><dt>AI status</dt><dd>Available</dd></div><div><dt>Routing</dt><dd>General queue</dd></div></dl>
        </aside>
      </div>
    </Shell>
  );
}

function FlowMockup() {
  const nodes = [
    [Zap, "Trigger", "New request"], [Bot, "AI analysis", "Classify intent"],
    [Workflow, "Condition", "Priority check"], [Check, "Approval", "Team review"],
    [Send, "Action", "Route workflow"],
  ] as const;
  return (
    <Shell label="Flow">
      <div className="flow-ui">
        <div className="mock-toolbar"><div><Workflow size={16} /><strong>Request routing</strong><span>Draft workflow</span></div><button type="button"><Play size={13} /> Test flow</button></div>
        <div className="flow-canvas">
          <div className="flow-rail" aria-hidden="true"><span /></div>
          {nodes.map(([Icon, title, detail], index) => <div className="flow-node" key={title}><span className="flow-node__icon"><Icon size={15} /></span><div><small>Step {index + 1}</small><strong>{title}</strong><span>{detail}</span></div><ChevronRight size={14} /></div>)}
        </div>
      </div>
    </Shell>
  );
}

function LearnMockup() {
  return (
    <Shell label="Learn">
      <div className="dashboard-ui">
        <aside className="mock-sidebar"><div className="mock-sidebar__title"><GraduationCap size={15} /> Learning</div><button className="is-current" type="button"><LayoutDashboard size={14} /> Overview</button><button type="button"><Play size={14} /> Courses</button><button type="button"><Check size={14} /> Assessments</button></aside>
        <div className="dashboard-main">
          <div className="dashboard-heading"><div><span className="mock-kicker">Demo learner</span><h4>Learning overview</h4></div><button aria-label="Search courses" type="button"><Search size={15} /></button></div>
          <div className="learn-stats"><article><span>Learning state</span><strong>In progress</strong><small>Pathway active</small></article><article><span>Assessment</span><strong>Ready</strong><small>Review available</small></article><article><span>Timeline</span><strong>On track</strong><small>Workspace live</small></article></div>
          <div className="dashboard-grid"><article className="course-card"><span className="course-card__icon"><Box size={18} /></span><div><small>Current module</small><strong>Product foundations</strong><span>Learning pathway</span></div><div className="progress-track"><i style={{ "--progress": "68%" } as React.CSSProperties} /></div></article><article className="activity-card"><span className="mock-kicker">Learner activity</span><p><Check size={13} /> Interface systems <span>Complete</span></p><p><Clock3 size={13} /> Applied automation <span>In progress</span></p></article></div>
        </div>
      </div>
    </Shell>
  );
}

function CommerceMockup() {
  const bars = [38, 54, 43, 69, 57, 78, 88];
  return (
    <Shell label="Commerce">
      <div className="dashboard-ui">
        <aside className="mock-sidebar"><div className="mock-sidebar__title"><ShoppingBag size={15} /> Commerce</div><button className="is-current" type="button"><LayoutDashboard size={14} /> Overview</button><button type="button"><PackageCheck size={14} /> Orders</button><button type="button"><Box size={14} /> Inventory</button></aside>
        <div className="dashboard-main">
          <div className="dashboard-heading"><div><span className="mock-kicker">Sample store data</span><h4>Commerce overview</h4></div><button type="button">This week <ChevronRight size={13} /></button></div>
          <div className="commerce-stats"><article><span>Orders</span><strong>Processing</strong><small>Queue connected</small></article><article><span>Inventory</span><strong>Synced</strong><small>Catalogue live</small></article><article><span>Operations</span><strong>Healthy</strong><small>Workspace active</small></article></div>
          <div className="commerce-grid"><article className="chart-card"><div><span className="mock-kicker">Order activity</span><small>Sample values</small></div><div className="bar-chart">{bars.map((height, index) => <i key={index} style={{ "--bar-height": `${height}%` } as React.CSSProperties} />)}</div></article><article className="orders-card"><span className="mock-kicker">Recent orders</span><p><span>#1048</span><strong>Processing</strong></p><p><span>#1047</span><strong>Fulfilled</strong></p><p><span>#1046</span><strong>Review</strong></p></article></div>
        </div>
      </div>
    </Shell>
  );
}

function SecureMockup() {
  return (
    <Shell label="Secure">
      <div className="secure-ui">
        <div className="secure-top"><div><span className="secure-shield"><ShieldCheck size={22} /></span><div><span className="mock-kicker">Monitoring interface</span><h4>Access visibility</h4></div></div><span className="mock-status"><i /> Monitoring</span></div>
        <div className="secure-stats"><article><Activity size={16} /><span>Auth events</span><strong>Verified</strong><small>Monitoring active</small></article><article><LockKeyhole size={16} /><span>Sessions</span><strong>Protected</strong><small>Access controlled</small></article><article><Bell size={16} /><span>Review queue</span><strong>Attention</strong><small>Review available</small></article></div>
        <div className="security-events"><div className="security-events__head"><span>Recent access activity</span><span>Risk level</span></div><p><span><i className="event-dot event-dot--ok" />Successful login <small>Demo device · 2 min ago</small></span><strong>Routine</strong></p><p><span><i className="event-dot event-dot--warn" />New device review <small>Sample account · 18 min ago</small></span><strong>Review</strong></p><p><span><i className="event-dot event-dot--ok" />Session refreshed <small>Demo browser · 31 min ago</small></span><strong>Routine</strong></p></div>
      </div>
    </Shell>
  );
}

export function ProductMockup({ type }: { type: ProductInterfaceType }) {
  switch (type) {
    case "flow": return <FlowMockup />;
    case "learn": return <LearnMockup />;
    case "commerce": return <CommerceMockup />;
    case "secure": return <SecureMockup />;
    default: return <AIDeskMockup />;
  }
}
