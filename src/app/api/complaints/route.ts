import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/mockDb';

export async function GET(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const defaultComplaints = [
        {
          id: "CP-2023-8942",
          problem: "Road Pothole Damage",
          location: "Bapatla Main Road, Near School",
          authority: "Bapatla Municipal Corporation",
          status: "In Progress",
          date: "Oct 12, 2023",
          raw: null
        },
        {
          id: "CP-2023-7721",
          problem: "Streetlight Malfunction",
          location: "Ward 4, Railway Station Road",
          authority: "APEPDCL",
          status: "Resolved",
          date: "Sep 28, 2023",
          raw: null
        },
        {
          id: "CP-2023-6590",
          problem: "Garbage Accumulation",
          location: "Gandhi Market Junction",
          authority: "Bapatla Municipality Sanitation Dept",
          status: "Rejected",
          date: "Sep 15, 2023",
          raw: null
        }
      ];

    const userComplaints = db.complaints.length > 0 ? db.complaints : defaultComplaints;

    return NextResponse.json({
      success: true,
      complaints: userComplaints
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch complaints' }, { status: 500 });
  }
}
