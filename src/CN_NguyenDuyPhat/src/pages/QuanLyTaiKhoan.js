import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuanLyTaiKhoan.css';

function QuanLyTaiKhoan() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Load users từ localStorage
  useEffect(() => {
    loadUsers();
  }, []);

  // Filter users khi search thay đổi
  useEffect(() => {
    filterUsers();
  }, [users, searchTerm]);

  const loadUsers = () => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(savedUsers);
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.id.toString().includes(term) ||
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.phone?.includes(term)
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    setFilteredUsers(filtered);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const viewUserDetail = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || ''
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
    setEditForm({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const updateUser = () => {
    if (!editForm.name || !editForm.email) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    // Kiểm tra email đã tồn tại (trừ user hiện tại)
    const emailExists = users.find(
      u => u.email === editForm.email && u.id !== selectedUser.id
    );
    if (emailExists) {
      alert('Email này đã được sử dụng bởi tài khoản khác!');
      return;
    }

    const updatedUsers = users.map(user =>
      user.id === selectedUser.id
        ? { ...user, ...editForm, updatedAt: new Date().toISOString() }
        : user
    );
    
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Cập nhật selected user
    setSelectedUser({ ...selectedUser, ...editForm });
    alert('✅ Cập nhật thông tin thành công!');
    closeEditModal();
  };

  const deleteUser = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác!')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      if (selectedUser && selectedUser.id === userId) {
        closeDetailModal();
        closeEditModal();
      }
      alert('✅ Xóa tài khoản thành công!');
    }
  };

  const resetPassword = (userId) => {
    if (window.confirm('Bạn có muốn đặt lại mật khẩu cho tài khoản này thành "123456"?')) {
      const updatedUsers = users.map(user =>
        user.id === userId
          ? { ...user, password: '123456' }
          : user
      );
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      alert('✅ Đặt lại mật khẩu thành công! Mật khẩu mới: 123456');
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.email).length;

  return (
    <div className="quan-ly-tai-khoan">
      <div className="admin-header">
        <h1>👥 Quản Lý Tài Khoản Khách Hàng</h1>
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Về trang chủ
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Tổng tài khoản</h3>
            <p className="stat-value">{totalUsers}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-info">
            <h3>Tài khoản hoạt động</h3>
            <p className="stat-value success">{activeUsers}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, SĐT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        {filteredUsers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👤</div>
            <h3>Không có tài khoản nào</h3>
            <p>Chưa có tài khoản nào phù hợp với tìm kiếm của bạn</p>
          </div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Ngày đăng ký</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="user-id">#{user.id}</td>
                  <td className="user-name">{user.name || 'N/A'}</td>
                  <td className="user-email">{user.email || 'N/A'}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td className="user-address">{user.address || 'N/A'}</td>
                  <td className="user-date">{formatDate(user.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-view"
                        onClick={() => viewUserDetail(user)}
                      >
                        Xem
                      </button>
                      <button 
                        className="btn-edit"
                        onClick={() => openEditModal(user)}
                      >
                        Sửa
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => deleteUser(user.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* User Detail Modal */}
      {showDetailModal && selectedUser && (
        <div className="modal-overlay" onClick={closeDetailModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Chi tiết tài khoản #{selectedUser.id}</h2>
              <button className="close-btn" onClick={closeDetailModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h3>Thông tin tài khoản</h3>
                <div className="detail-grid">
                  <div><strong>ID:</strong> #{selectedUser.id}</div>
                  <div><strong>Họ tên:</strong> {selectedUser.name || 'N/A'}</div>
                  <div><strong>Email:</strong> {selectedUser.email || 'N/A'}</div>
                  <div><strong>Số điện thoại:</strong> {selectedUser.phone || 'N/A'}</div>
                  <div><strong>Địa chỉ:</strong> {selectedUser.address || 'N/A'}</div>
                  <div><strong>Ngày đăng ký:</strong> {formatDate(selectedUser.createdAt)}</div>
                  <div><strong>Cập nhật lần cuối:</strong> {formatDate(selectedUser.updatedAt) || 'Chưa cập nhật'}</div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-warning"
                onClick={() => {
                  closeDetailModal();
                  openEditModal(selectedUser);
                }}
              >
                Sửa thông tin
              </button>
              <button 
                className="btn-secondary"
                onClick={() => resetPassword(selectedUser.id)}
              >
                Đặt lại mật khẩu
              </button>
              <button 
                className="btn-danger"
                onClick={() => deleteUser(selectedUser.id)}
              >
                Xóa tài khoản
              </button>
              <button className="btn-primary" onClick={closeDetailModal}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Sửa thông tin tài khoản #{selectedUser.id}</h2>
              <button className="close-btn" onClick={closeEditModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="edit-form">
                <div className="form-group">
                  <label>Họ tên *</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ</label>
                  <textarea
                    name="address"
                    value={editForm.address}
                    onChange={handleEditChange}
                    rows="3"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeEditModal}>
                Hủy
              </button>
              <button className="btn-primary" onClick={updateUser}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuanLyTaiKhoan;




