'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { TeamMember, AdminUser } from '@/types';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Upload,
  ArrowUp,
  ArrowDown,
  Globe,
  Linkedin,
  ShieldCheck,
  Eye,
  Loader2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export default function AdminTeamManagementPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit / Add modal state
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Uploading state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Founder delete protection modal state
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [confirmDeleteText, setConfirmDeleteText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Form field state
  const [formState, setFormState] = useState<Partial<TeamMember>>({
    fullName: '',
    publicTitle: '',
    department: 'Commercial & Strategy',
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
        const sorted = (teamData.members || []).sort(
          (a: TeamMember, b: TeamMember) => a.displayOrder - b.displayOrder
        );
        setMembers(sorted);
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
    setUploadError('');
    setStatusMessage('');
    setSaveStatus('idle');
    setModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setIsNew(false);
    setEditingMember(member);
    setFormState({ ...member });
    setRespInput('');
    setUploadError('');
    setStatusMessage('');
    setSaveStatus('idle');
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

  // Handle Photo Upload to Supabase Storage
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size client-side (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size exceeds 5MB limit. Please choose a smaller photograph.');
      return;
    }

    setUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/team/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setUploadError(data.error || 'Failed to upload photograph to storage.');
        return;
      }

      setFormState((prev) => ({
        ...prev,
        photoUrl: data.url,
      }));
    } catch {
      setUploadError('Network error uploading portrait. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemovePhoto = () => {
    setFormState((prev) => ({
      ...prev,
      photoUrl: '',
    }));
  };

  // Toggle publish status immediately from list
  const handleToggleStatus = async (member: TeamMember) => {
    const nextStatus = member.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch('/api/admin/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: member.id, status: nextStatus }),
      });
      if (res.ok) {
        await fetchSessionAndTeam();
      }
    } catch {
      // Ignored
    }
  };

  // Reorder display order
  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === members.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const currentMember = members[index];
    const targetMember = members[targetIndex];

    const newOrderCurrent = targetMember.displayOrder;
    const newOrderTarget = currentMember.displayOrder;

    try {
      await Promise.all([
        fetch('/api/admin/team', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentMember.id, displayOrder: newOrderCurrent }),
        }),
        fetch('/api/admin/team', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: targetMember.id, displayOrder: newOrderTarget }),
        }),
      ]);
      await fetchSessionAndTeam();
    } catch {
      // Re-fetch to sync
      await fetchSessionAndTeam();
    }
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

  const requestDelete = (member: TeamMember) => {
    setDeleteTarget(member);
    setConfirmDeleteText('');
  };

  const executeDelete = async () => {
    if (!deleteTarget) return;

    // If target is founder, require explicit confirmation
    if (deleteTarget.isFounder || ['Affan Ahmed Shariff', 'Akarsh P. Thodaskar', 'Dhananjaya G.R.'].includes(deleteTarget.fullName)) {
      const expected = deleteTarget.fullName.split(' ')[0].toLowerCase();
      if (confirmDeleteText.trim().toLowerCase() !== expected) {
        alert(`Safety check failed: please type "${expected}" to confirm deletion.`);
        return;
      }
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/team?id=${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to delete member.');
        return;
      }

      setDeleteTarget(null);
      await fetchSessionAndTeam();
    } catch {
      alert('Network error while deleting member.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#121110] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#C25E38] mx-auto" />
          <p className="font-mono text-xs text-[#5C5751] dark:text-[#A8A29A]">Loading Team Directory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#121110] pt-24 pb-16 transition-colors">
      {/* Top Architectural Header */}
      <div className="bg-white dark:bg-[#1A1917] border-b border-[#E6DFD5] dark:border-[#2C2926] py-5 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-lg bg-[#FBF9F5] dark:bg-[#242220] hover:bg-[#F2EDE4] dark:hover:bg-[#2C2926] text-[#191817] dark:text-[#F5F2EB] border border-[#E6DFD5] dark:border-[#3D3935] transition-colors"
              aria-label="Back to Admin Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-sans text-xl font-bold text-[#191817] dark:text-white">
                Team &amp; Founder Management
              </h1>
              <p className="text-xs text-[#5C5751] dark:text-[#A8A29A] font-mono mt-0.5">
                Manage public leadership profiles, photography, and display order &middot; Logged in as: {currentUser?.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/team"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#191817] dark:text-[#F5F2EB] bg-[#FBF9F5] dark:bg-[#242220] hover:bg-[#F2EDE4] dark:hover:bg-[#2C2926] border border-[#E6DFD5] dark:border-[#3D3935] rounded-lg transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Public Page</span>
            </Link>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#C25E38] hover:bg-[#A34520] rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 text-xs">
          <p className="text-[#5C5751] dark:text-[#A8A29A] leading-relaxed">
            Profiles marked as <strong>Published</strong> appear immediately on the public website (<Link href="/team" className="underline hover:text-[#C25E38]">/team</Link> and homepage leadership section).
          </p>
          <span className="font-mono text-[#C25E38] font-bold">
            {members.length} Total Profiles ({members.filter((m) => m.status === 'published').length} Live)
          </span>
        </div>

        {/* Members Table */}
        <div className="bg-white dark:bg-[#1A1917] rounded-xl border border-[#E6DFD5] dark:border-[#2C2926] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FBF9F5] dark:bg-[#242220] border-b border-[#E6DFD5] dark:border-[#2C2926] font-mono text-[11px] text-[#5C5751] dark:text-[#A8A29A] uppercase tracking-wider">
                  <th className="py-3 px-4 w-16">Order</th>
                  <th className="py-3 px-4 w-16">Portrait</th>
                  <th className="py-3 px-4">Name &amp; Role</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Links</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DFD5] dark:divide-[#2C2926]">
                {members.map((member, index) => {
                  const photo = member.photoUrl || member.avatarUrl;
                  const isFirst = index === 0;
                  const isLast = index === members.length - 1;

                  return (
                    <tr key={member.id} className="hover:bg-[#FBF9F5]/60 dark:hover:bg-[#242220]/50 transition-colors">
                      {/* Order Controls */}
                      <td className="py-3 px-4 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#191817] dark:text-white">#{member.displayOrder}</span>
                          <div className="flex flex-col">
                            <button
                              type="button"
                              disabled={isFirst}
                              onClick={() => handleMoveOrder(index, 'up')}
                              className="p-0.5 text-[#8C867E] hover:text-[#191817] dark:hover:text-white disabled:opacity-20"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={isLast}
                              onClick={() => handleMoveOrder(index, 'down')}
                              className="p-0.5 text-[#8C867E] hover:text-[#191817] dark:hover:text-white disabled:opacity-20"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Portrait Thumbnail */}
                      <td className="py-3 px-4">
                        {photo ? (
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#E6DFD5] dark:border-[#3D3935] bg-[#F2EDE4] dark:bg-[#242220]">
                            <Image
                              src={photo}
                              alt={member.fullName}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-[#F2EDE4] dark:bg-[#242220] border border-[#E6DFD5] dark:border-[#3D3935] flex items-center justify-center text-xs font-mono font-bold text-[#C25E38]">
                            {member.fullName.split(' ').map((n) => n[0]).join('')}
                          </div>
                        )}
                      </td>

                      {/* Name & Role */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#191817] dark:text-white font-sans">
                            {member.fullName}
                          </span>
                          {member.isFounder && (
                            <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-[#1065FF]/10 text-[#1065FF] border border-[#1065FF]/20 rounded font-semibold">
                              Founder
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#C25E38] font-mono mt-0.5">{member.publicTitle}</div>
                      </td>

                      {/* Department */}
                      <td className="py-3 px-4 text-[#5C5751] dark:text-[#A8A29A]">
                        {member.department}
                      </td>

                      {/* Status with Quick Toggle */}
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(member)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono uppercase font-semibold transition-colors ${
                            member.status === 'published'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                              : member.status === 'draft'
                              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-100'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700'
                          }`}
                          title="Click to toggle publish status"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          <span>{member.status}</span>
                        </button>
                      </td>

                      {/* Links */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {member.linkedinUrl && (
                            <a
                              href={member.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#1065FF] hover:text-[#0C4ECE]"
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
                              className="text-[#C25E38] hover:text-[#A34520]"
                              title="Portfolio"
                            >
                              <Globe className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(member)}
                          className="inline-flex items-center gap-1 text-xs text-[#191817] dark:text-[#F5F2EB] hover:text-[#C25E38] font-semibold px-2.5 py-1.5 rounded-lg bg-[#FBF9F5] dark:bg-[#242220] border border-[#E6DFD5] dark:border-[#3D3935] transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>

                        {currentUser?.role === 'super_admin' && (
                          <button
                            type="button"
                            onClick={() => requestDelete(member)}
                            className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 px-2.5 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
        >
          <div className="bg-white dark:bg-[#1A1917] rounded-xl shadow-xl border border-[#E6DFD5] dark:border-[#2C2926] max-w-2xl w-full p-6 sm:p-8 relative my-8 text-[#191817] dark:text-white">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-[#8C867E] hover:text-[#191817] dark:hover:text-white rounded-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-sans text-xl font-bold mb-1">
              {isNew ? 'Add Team Member' : `Edit Profile: ${formState.fullName}`}
            </h2>
            <p className="text-xs text-[#5C5751] dark:text-[#A8A29A] mb-6 font-mono">
              Configure public-facing details, portrait photograph, and publishing parameters.
            </p>

            {statusMessage && (
              <div
                role="alert"
                className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              {/* Row 1: Name & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase font-mono tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.fullName || ''}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#E6DFD5] dark:border-[#3D3935] bg-[#FBF9F5] dark:bg-[#121110] text-[#191817] dark:text-white focus:ring-1 focus:ring-[#C25E38] focus:outline-none"
                    placeholder="e.g. Dhananjaya G.R."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase font-mono tracking-wider mb-1">
                    Public Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.publicTitle || ''}
                    onChange={(e) => setFormState({ ...formState, publicTitle: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#E6DFD5] dark:border-[#3D3935] bg-[#FBF9F5] dark:bg-[#121110] text-[#191817] dark:text-white focus:ring-1 focus:ring-[#C25E38] focus:outline-none"
                    placeholder="e.g. Founder, Business Strategy & Systems"
                  />
                </div>
              </div>

              {/* Row 2: Department, Order, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase font-mono tracking-wider mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formState.department || ''}
                    onChange={(e) => setFormState({ ...formState, department: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#E6DFD5] dark:border-[#3D3935] bg-[#FBF9F5] dark:bg-[#121110] text-[#191817] dark:text-white focus:ring-1 focus:ring-[#C25E38] focus:outline-none"
                    placeholder="Strategy & Operations"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase font-mono tracking-wider mb-1">
                    Publish Status
                  </label>
                  <select
                    value={formState.status}
                    onChange={(e) =>
                      setFormState({ ...formState, status: e.target.value as TeamMember['status'] })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#E6DFD5] dark:border-[#3D3935] bg-[#FBF9F5] dark:bg-[#121110] text-[#191817] dark:text-white focus:ring-1 focus:ring-[#C25E38] focus:outline-none"
                  >
                    <option value="published">🟢 Published (Live)</option>
                    <option value="draft">🟡 Draft (Hidden)</option>
                    <option value="inactive">⚪ Inactive (Archived)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase font-mono tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formState.displayOrder || 1}
                    onChange={(e) =>
                      setFormState({ ...formState, displayOrder: parseInt(e.target.value, 10) || 1 })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#E6DFD5] dark:border-[#3D3935] bg-[#FBF9F5] dark:bg-[#121110] text-[#191817] dark:text-white focus:ring-1 focus:ring-[#C25E38] focus:outline-none"
                  />
                </div>
              </div>

              {/* Founder Flag */}
              <div className="flex items-center gap-2 p-3 bg-[#FBF9F5] dark:bg-[#242220] rounded-lg border border-[#E6DFD5] dark:border-[#3D3935]">
                <input
                  type="checkbox"
                  id="isFounderCheck"
                  checked={Boolean(formState.isFounder)}
                  onChange={(e) => setFormState({ ...formState, isFounder: e.target.checked })}
                  className="w-4 h-4 text-[#C25E38] rounded border-[#E6DFD5] focus:ring-[#C25E38]"
                />
                <label htmlFor="isFounderCheck" className="text-xs font-medium cursor-pointer">
                  Designate as Founding Partner (Enables verified leadership badge &amp; deletion lock)
                </label>
              </div>

              {/* Photograph Upload & Preview */}
              <div className="p-4 bg-[#FBF9F5] dark:bg-[#242220] rounded-lg border border-[#E6DFD5] dark:border-[#3D3935] space-y-3">
                <label className="block text-xs font-semibold uppercase font-mono tracking-wider">
                  Portrait Photograph (Supabase Storage)
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Preview Box */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#E6DFD5] dark:border-[#3D3935] bg-[#EAE4DC] dark:bg-[#1A1917] flex-shrink-0 flex items-center justify-center">
                    {formState.photoUrl ? (
                      <Image
                        src={formState.photoUrl}
                        alt="Portrait preview"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-mono text-[#8C867E]">No Photo</span>
                    )}
                  </div>

                  {/* Actions & File Input */}
                  <div className="flex-1 space-y-2 w-full">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="portraitUploadInput"
                    />

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        disabled={uploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#191817] dark:text-[#F5F2EB] bg-white dark:bg-[#1A1917] hover:bg-[#F2EDE4] dark:hover:bg-[#2C2926] border border-[#E6DFD5] dark:border-[#3D3935] rounded-lg transition-colors shadow-xs disabled:opacity-50"
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Uploading to Storage...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5 text-[#C25E38]" />
                            <span>{formState.photoUrl ? 'Replace Photo' : 'Upload From Computer'}</span>
                          </>
                        )}
                      </button>

                      {formState.photoUrl && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="px-2.5 py-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] text-[#5C5751] dark:text-[#A8A29A]">
                      Recommended: Square portrait (500x500px or larger). JPEG, PNG, or WebP up to 5MB. Uploads securely to Supabase Storage bucket <code>team-photos</code>.
                    </p>

                    {uploadError && (
                      <p className="text-xs text-red-600 font-medium">{uploadError}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-semibold uppercase font-mono tracking-wider mb-1">
                  Public Biography *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formState.bio || ''}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#E6DFD5] dark:border-[#3D3935] bg-[#FBF9F5] dark:bg-[#121110] text-[#191817] dark:text-white focus:ring-1 focus:ring-[#C25E38] focus:outline-none"
                  placeholder="Summary of experience, focus areas, and strategic domain..."
                />
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-xs font-semibold uppercase font-mono tracking-wider mb-1">
                  Key Practice Responsibilities
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={respInput}
                    onChange={(e) => setRespInput(e.target.value)}
                    placeholder="Add specific focus area (e.g. Enterprise systems architecture)..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#E6DFD5] dark:border-[#3D3935] bg-[#FBF9F5] dark:bg-[#121110] text-[#191817] dark:text-white focus:ring-1 focus:ring-[#C25E38] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddResponsibility}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#C25E38] hover:bg-[#A34520] rounded-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {(formState.responsibilities || []).map((resp, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs bg-[#FBF9F5] dark:bg-[#242220] border border-[#E6DFD5] dark:border-[#3D3935] px-2 py-0.5 rounded text-[#191817] dark:text-white"
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

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase font-mono tracking-wider mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={formState.linkedinUrl || ''}
                    onChange={(e) => setFormState({ ...formState, linkedinUrl: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#E6DFD5] dark:border-[#3D3935] bg-[#FBF9F5] dark:bg-[#121110] text-[#191817] dark:text-white focus:ring-1 focus:ring-[#C25E38] focus:outline-none"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase font-mono tracking-wider mb-1">
                    Personal Portfolio / Website URL
                  </label>
                  <input
                    type="url"
                    value={formState.portfolioUrl || ''}
                    onChange={(e) => setFormState({ ...formState, portfolioUrl: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#E6DFD5] dark:border-[#3D3935] bg-[#FBF9F5] dark:bg-[#121110] text-[#191817] dark:text-white focus:ring-1 focus:ring-[#C25E38] focus:outline-none"
                    placeholder="https://affanshariff.com"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E6DFD5] dark:border-[#2C2926] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#191817] dark:text-[#F5F2EB] bg-[#FBF9F5] dark:bg-[#242220] border border-[#E6DFD5] dark:border-[#3D3935] rounded-lg hover:bg-[#F2EDE4] dark:hover:bg-[#2C2926] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveStatus === 'saving'}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#C25E38] hover:bg-[#A34520] rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                >
                  {saveStatus === 'saving' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save &amp; Publish Profile</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Founder Deletion Confirmation Guardrail Modal */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-white dark:bg-[#1A1917] rounded-xl shadow-xl border border-red-200 dark:border-red-900 max-w-md w-full p-6 text-[#191817] dark:text-white">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-sans text-lg font-bold">
                {deleteTarget.isFounder ? 'Protected Founder Deletion' : 'Confirm Profile Deletion'}
              </h3>
            </div>

            <p className="text-xs text-[#5C5751] dark:text-[#A8A29A] leading-relaxed mb-4">
              You are about to permanently delete{' '}
              <strong className="text-[#191817] dark:text-white">{deleteTarget.fullName}</strong>.
              {deleteTarget.isFounder && (
                <span className="block mt-2 text-red-600 dark:text-red-400 font-semibold">
                  Warning: This profile is a designated Founding Partner. To prevent accidental deletion, type the founder&apos;s first name below to confirm.
                </span>
              )}
            </p>

            {deleteTarget.isFounder && (
              <div className="mb-4">
                <label className="block text-xs font-mono uppercase text-[#5C5751] dark:text-[#A8A29A] mb-1">
                  Type &quot;{deleteTarget.fullName.split(' ')[0].toLowerCase()}&quot; to confirm:
                </label>
                <input
                  type="text"
                  value={confirmDeleteText}
                  onChange={(e) => setConfirmDeleteText(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-red-300 dark:border-red-800 bg-[#FBF9F5] dark:bg-[#121110] focus:ring-1 focus:ring-red-500 focus:outline-none"
                  placeholder={deleteTarget.fullName.split(' ')[0].toLowerCase()}
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6DFD5] dark:border-[#2C2926]">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#FBF9F5] dark:bg-[#242220] border border-[#E6DFD5] dark:border-[#3D3935]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  isDeleting ||
                  (deleteTarget.isFounder &&
                    confirmDeleteText.trim().toLowerCase() !==
                      deleteTarget.fullName.split(' ')[0].toLowerCase())
                }
                onClick={executeDelete}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-40 transition-colors flex items-center gap-1.5"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Permanently Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
