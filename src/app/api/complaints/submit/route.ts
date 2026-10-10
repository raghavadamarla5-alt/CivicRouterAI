import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDb';

export async function POST(request: Request) {
  try {
    const { complaintData } = await request.json();

    const newId = `CP-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`;
    const newComplaint = {
        id: newId,
        problem: complaintData.problemSummary || complaintData.identifiedProblem || "Reported Issue",
        location: complaintData.location ? `${complaintData.location.town || ''}, ${complaintData.location.district || ''}`.trim() : "Unknown",
        authority: complaintData.recommendedAuthority || complaintData.responsibleAuthority || "Local Authority",
        status: "Submitted to Civic AI",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        raw: complaintData
    };

    db.complaints.unshift(newComplaint);
    
    return NextResponse.json({
      success: true,
      message: "Complaint saved successfully in Civic AI",
      complaint: newComplaint
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit complaint' }, { status: 500 });
  }
}
