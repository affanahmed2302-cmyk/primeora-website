'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TeamMember, AdminUser } from '@/types';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Users,
  Linkedin,
  Globe,
  Loader2,
} from 'lucide-react';

export default function AdminTeamCmsPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit / Add modal state
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Form field state
  const [formState, setFormState] = useState<Partial<TeamMember>>({
    fullName: '',
    publicTitle: '',
    department: 'Practice Leadership',
    bio: '',
    responsibilities: [],
    photoUrl: '',
    linkedinUrl: '',
    portfolioUrl: '',
    displayOrder: 1,
    status: 'published',
    isFounder: false,
  });

  const [respInput, setRespInput] = useState('');

  const fetchSessionAndTeam = async () => {
    try {
      const sessionRes = await fetch('/api/admin/session');
      if (!sessionRes.ok) {
        router.push('/admin/login');
        return;
      }
      const sessionData = await sessionRes.json();
      setCurrentUser(sessionData.user);

      const teamRes = await fetch('/api/admin/team');
      if (teamRes.ok) {
        const teamData = await teamRes.json();
        setMembers(teamData.members || []);
      }
    } catch {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionAndTeam();
  }, []);

  const openAddModal = () => {
    setIsNew(true);
    setEditingMember(null);
    setFormState({
      fullName: '',
      publicTitle: '',
      department: 'Consulting Practice',
      bio: '',
      responsibilities: [],
      photoUrl: '',
      linkedinUrl: '',
      portfolioUrl: '',
      displayOrder: members.length + 1,
      status: 'draft',
      isFounder: false,
    });
    setRespInput('');
    setModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setIsNew(false);
    setEditingMember(member);
    setFormState({ ...member });
    setRespInput('');
    setModalOpen(true);
  };

  const handleAddResponsibility = () => {
    if (!respInput.trim()) return;
    const current = formState.responsibilities || [];
    setFormState({ ...formState, responsibilities: [...current, respInput.trim()] });
    setRespInput('');
  };

  const handleRemoveResponsibility = (index: number) => {
    const current = formState.responsibilities || [];
    setFormState({ ...formState, responsibilities: current.filter((_, i) => i !== index) });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullName || !formState.publicTitle || !formState.bio) {
      setStatusMessage('Full name, public title, and biography are required.');
      setSaveStatus('error');
      return;
    }

    setSaveStatus('saving');
    setStatusMessage('');

    try {
      const endpoint = '/api/admin/team';
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setSaveStatus('error');
        setStatusMessage(data.error || 'Failed to save team member.');
        return;
      }

      setSaveStatus('success');
      setModalOpen(false);
      await fetchSessionAndTeam();
    } catch {
      setSaveStatus('error');
      setStatusMessage('Network error while saving profile.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete ${name}? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/team?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to delete member.');
        return;
      }

      await fetchSessionAndTeam();
    } catch {
      alert('Network error while deleting member.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <p className="font-mono text-xs text-charcoal-muted">Loading Team CMS...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-16">
      {/* Top Header */}
      <div className="bg-forest text-ivory py-4 px-4 sm:px-6 lg:px-8 border-b border-forest-dark mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-ivory transition-colors"
              aria-label="Back to Admin Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-serif text-lg font-bold">Team Directory CMS</h1>
              <p className="text-xs text-ivory/70 font-mono">
                Author & manage public team profiles &middot; Role: {currentUser?.role}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-forest bg-ivory rounded hover:bg-white transition-colors shadow-subtle"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Team Member</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between pb-2">
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Changes saved here update the public <strong>/about</strong> and <strong>Home</strong> pages immediately upon setting status to <em>Published</em>.
          </p>
          <span className="text-xs font-mono text-forest font-semibold">
            {members.length} Total Profiles
          </span>
        </div>

        {/* Members List Table / Cards */}
        <div className="bg-white rounded-xl border border-border-medium shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-ivory-light border-b border-border-subtle font-mono text-[11px] text-charcoal-muted uppercase">
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Member Name & Role</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Links</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-ivory/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-forest font-bold">
                      #{member.displayOrder}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-serif font-bold text-sm text-forest">
                        {member.fullName}
                      </div>
                      <div className="text-teal font-mono text-xs">{member.publicTitle}</div>
                    </td>
                    <td className="py-3 px-4 text-charcoal-muted">{member.department}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                          member.status === 'published'
                            ? 'bg-teal/15 text-teal border border-teal/30'
                            : member.status === 'draft'
                            ? 'bg-copper-subtle text-copper border border-copper/30'
                            : 'bg-charcoal/10 text-charcoal-muted border border-border-medium'
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-forest hover:text-teal inline-block"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.portfolioUrl && (
                        <a
                          href={member.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-copper hover:text-copper-dark inline-block"
                          title="Portfolio"
                        >
                          <Globe className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(member)}
                        className="inline-flex items-center gap-1 text-xs text-forest hover:text-teal font-semibold px-2 py-1 rounded bg-ivory border border-border-subtle"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      {currentUser?.role === 'super_admin' && (
                        <button
                          type="button"
                          onClick={() => handleDelete(member.id, member.fullName)}
                          className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 px-2 py-1 rounded bg-red-50 border border-red-200"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm overflow-y-auto"
        >
          <div className="bg-white rounded-xl shadow-dropdown border border-border-medium max-w-2xl w-full p-6 sm:p-8 relative my-8">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-charcoal-muted hover:text-charcoal rounded-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl font-bold text-forest mb-1">
              {isNew ? 'Add Team Member' : `Edit Profile: ${formState.fullName}`}
            </h2>
            <p className="text-xs text-charcoal-muted mb-6">
              Configure public-facing details, biography, responsibilities, and publication status.
            </p>

            {statusMessage && (
              <div
                role="alert"
                className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{statusMessage}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              {/* Row 1: Name & Public Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.fullName || ''}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded border border-border-medium focus:ring-1 focus:ring-teal focus:outline-none"
                    placeholder="Affan Ahmed Shariff"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-1">
                    Public Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.publicTitle || ''}
                    onChange={(e) => setFormState({ ...formState, publicTitle: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded border border-border-medium focus:ring-1 focus:ring-teal focus:outline-none"
                    placeholder="Founder, Business Development"
                  />
                </div>
              </div>

              {/* Row 2: Department & Status & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formState.department || ''}
                    onChange={(e) => setFormState({ ...formState, department: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded border border-border-medium focus:ring-1 focus:ring-teal focus:outline-none"
                    placeholder="Commercial & Growth"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-1">
                    Publish Status
                  </label>
                  <select
                    value={formState.status}
                    onChange={(e) =>
                      setFormState({ ...formState, status: e.target.value as TeamMember['status'] })
                    }
                    className="w-full px-3 py-2 text-sm rounded border border-border-medium bg-white focus:ring-1 focus:ring-teal focus:outline-none"
                  >
                    <option value="published">🟢 Published</option>
                    <option value="draft">🟡 Draft (Hidden)</option>
                    <option value="inactive">⚪ Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formState.displayOrder || 1}
                    onChange={(e) =>
                      setFormState({ ...formState, displayOrder: parseInt(e.target.value, 10) || 1 })
                    }
                    className="w-full px-3 py-2 text-sm rounded border border-border-medium focus:ring-1 focus:ring-teal focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Bio */}
              <div>
                <label className="block text-xs font-semibold uppercase text-charcoal mb-1">
                  Public Biography *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formState.bio || ''}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded border border-border-medium focus:ring-1 focus:ring-teal focus:outline-none"
                  placeholder="Professional summary of background, focus areas, and practice domain..."
                />
              </div>

              {/* Row 4: Responsibilities */}
              <div>
                <label className="block text-xs font-semibold uppercase text-charcoal mb-1">
                  Key Responsibilities
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={respInput}
                    onChange={(e) => setRespInput(e.target.value)}
                    placeholder="Add a specific focus responsibility..."
                    className="flex-1 px-3 py-1.5 text-xs rounded border border-border-medium focus:ring-1 focus:ring-teal focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddResponsibility}
                    className="px-3 py-1.5 text-xs font-semibold text-ivory bg-forest rounded hover:bg-forest-light"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {(formState.responsibilities || []).map((resp, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs bg-ivory-light border border-border-subtle px-2 py-0.5 rounded text-charcoal"
                    >
                      <span>{resp}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveResponsibility(i)}
                        className="text-red-500 hover:text-red-700 font-bold ml-1"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 5: Verified Links & Photo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formState.linkedinUrl || ''}
                    onChange={(e) => setFormState({ ...formState, linkedinUrl: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded border border-border-medium focus:ring-1 focus:ring-teal focus:outline-none"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal mb-1">
                    External Portfolio / Website URL
                  </label>
                  <input
                    type="url"
                    value={formState.portfolioUrl || ''}
                    onChange={(e) => setFormState({ ...formState, portfolioUrl: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded border border-border-medium focus:ring-1 focus:ring-teal focus:outline-none"
                    placeholder="https://affanshariff.com"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-border-subtle flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-charcoal bg-ivory border border-border-medium rounded hover:bg-ivory-dark"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveStatus === 'saving'}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-ivory bg-forest rounded hover:bg-forest-light shadow-subtle disabled:opacity-50"
                >
                  {saveStatus === 'saving' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save & Publish Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
