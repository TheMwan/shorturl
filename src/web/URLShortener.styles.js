/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const pop = keyframes`
  0% { transform: scale(0.98); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const toastSlide = keyframes`
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const toastFadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; transform: translateX(100%); }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 540px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px;
  animation: ${pop} 220ms ease;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

export const IconBg = styled.div`
  background: #e0e7ff;
  padding: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #1f2937;
  text-align: center;
  margin: 8px 0 4px;
`;

export const Subtitle = styled.p`
  color: #6b7280;
  text-align: center;
  margin-bottom: 28px;
  font-size: 15px;
`;

export const Field = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.2s ease;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
  }
  &::placeholder {
    color: #9ca3af;
  }
`;

export const Button = styled.button`
  padding: 14px 18px;
  background: #667eea;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:hover:not(:disabled) {
    background: #5568d3;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export const ResultBox = styled.div`
  margin-top: 18px;
  padding: 18px;
  background: #f0fdf4;
  border: 2px solid #86efac;
  border-radius: 10px;
  animation: ${slideIn} 0.3s ease;
`;

export const ResultLabel = styled.p`
  font-size: 14px;
  color: #4b5563;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const ResultRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const ResultInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  background: #ffffff;
  border: 1.5px solid #86efac;
  border-radius: 8px;
  color: #1f2937;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #4ade80;
  }
`;

export const CopyBtn = styled.button`
  padding: 10px 16px;
  background: #667eea;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  &:hover {
    background: #5568d3;
    transform: translateY(-1px);
  }
  &:active {
    transform: scale(0.95);
  }
`;

export const History = styled.div`
  margin-top: 22px;
`;

export const HistoryTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HistoryList = styled.ul`
  list-style: none;
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
  &::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
  &::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
`;

export const HistoryItem = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
  transition: all 0.2s ease;
  animation: ${slideIn} 0.3s ease;
  &:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
  }
  a {
    color: #4f46e5;
    word-break: break-all;
    text-decoration: none;
    font-size: 14px;
    &:hover { text-decoration: underline; }
  }
`;

export const Toast = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  background: #10b981;
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  z-index: 1000;
  animation: ${toastSlide} 0.3s ease;
  &.fade-out { animation: ${toastFadeOut} 0.3s ease forwards; }
`;

export const ToastIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
`;

export const ClearHistoryBtn = styled.button`
  padding: 6px 12px;
  background: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #ef4444;
    color: white;
  }
`;

export const DeleteBtn = styled.button`
  padding: 6px 10px;
  background: transparent;
  color: #ef4444;
  border: 1px solid #fee2e2;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #fef2f2;
    border-color: #fecaca;
  }
`;