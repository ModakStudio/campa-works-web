import { useParams } from "react-router-dom";
import './DashboardDetail.css';

const ProfessorData = {
    1: {
        name: "김철수",
        role: "교수",
        priorityList:[
            {rank: "1순위", subject: "자료구조", credits: "3-3-0", isHighlighted: true},
            {rank: "2순위", subject: "알고리즘", credits: "3-2-2", isHighlighted: true},
            {rank: "3순위", subject: "컴퓨터구조", credits: "3-3-0", isHighlighted: true},
            {rank: "4순위", subject: "운영체제", credits: "3-3-0", isHighlighted: false},
            {rank: "5순위", subject: "이산수학", credits: "3-3-0", isHighlighted: false},
            {rank: "6순위", subject: "소프트웨어공학", credits: "3-3-0", isHighlighted: true},
        ],
        subjectPool: [
            {rank: "1순위", subject: "데이터베이스", credits: "3-3-0", isHighlighted: true },
            {rank: "2순위", subject: "웹프로그래밍", credits: "3-2-2", isHighlighted: false },
            {rank: "3순위", subject: "컴퓨팅 네트워크", credits: "3-3-0", isHighlighted: false },
            {rank: "4순위", subject: "프로그래밍언어론", credits: "3-3-0", isHighlighted: false },
            {rank: "5순위", subject: "인공지능", credits: "3-3-0", isHighlighted: true },
            {rank: "6순위", subject: "기계학습", credits: "3-3-0", isHighlighted: false },
        ],
        assignedcredits: "18/18",
        memo: " "
    },

    2: {
        name: "이영희",
        role: "부교수",
        semester: "2025-2026학년도 2학기 현황",
        priorityList: [
            {rank: "1순위", subject: "인공지능", credits: "3-3-0", isHighlighted: true },
            {rank: "2순위", subject: "기계학습", credits: "3-3-0", isHighlighted: true },
            {rank: "3순위", subject: "데이터베이스", credits: "3-2-2", isHighlighted: false },
            {rank: "4순위", subject: "컴퓨터네트워크", credits: "3-3-0", isHighlighted: false },
            {rank: "5순위", subject: "프로그래밍언어론", credits: "3-3-0", isHighlighted: false },
            {rank: "6순위", subject: "소프트웨어공학", credits: "3-3-0", isHighlighted: true },
        ],
        subjectPool: [
            {rank: "1순위", subject: "자료구조", credits: "3-3-0", isHighlighted: false },
            {rank: "2순위", subject: "알고리즘", credits: "3-2-2", isHighlighted: false },
            {rank: "3순위", subject: "컴퓨터구조", credits: "3-3-0", isHighlighted: true },
            {rank: "4순위", subject: "운영체제", credits: "3-3-0", isHighlighted: false },
            {rank: "5순위", subject: "이산수학", credits: "3-3-0", isHighlighted: false },
            {rank: "6순위", subject: "웹프로그래밍", credits: "3-2-2", isHighlighted: false },
        ],
        assignedcredits: "15/18",
        memo: "연구 과제 수행으로 인한 특정 시간대 강의 배정 요청"
    }
};

export default function DashboardDetail() {
    const { professorId } = useParams();
    const professor = ProfessorData[professorId];

    if (!professor) {
        return <div>교수 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="Container">
            <header className="Header">
                <h1 className="professorTitle">
                    {professor.name}
                    <span className="professorRole">{professor.role}</span>
                </h1>
                <p className="detailSubtitle">{professor.credits}</p>
            </header>

            <div className="Content">
                <div className="sectionRow">
                    <div className="rowLabel">우선 순위</div>
                    <div className="table">
                        <div className="tableHeaderRow">
                            {professor.priorityList.map((item, index) => (
                                <div key={index} className="tableHeaderCell">{item.rank}</div>
                            ))}
                        </div>

                        <div className="tableBodyRow">
                            {professor.priorityList.map((item, index) => (
                                <div key={index} className={"tableBodyCell "+(item.isHighlighted ? "highlight" : "")}>
                                    <div className="subjectName">{item.subject}</div>
                                    <div className="subjectCredits">{item.credits}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="sectionRow">
                    <div className="rowLabel">과목풀</div>
                    <div className="table">
                        <div className="tableHeaderRow">
                            {professor.subjectPool.map((item, index) => (
                                <div key={index} className="tableHeaderCell">{item.rank}</div>
                            ))}
                        </div>

                        <div className="tableBodyRow">
                            {professor.subjectPool.map((item, index) => (
                                <div key={index} className={"tableBodyCell "+(item.isHighlighted ? "highlight" : "")}>
                                    <div className="subjectName">{item.subject}</div>
                                    <div className="subjectCredits">{item.credits}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="creditsSection">
                    배정학점 <span className="creditsValue">{professor.assignedcredits}</span>
                </div>

                <div className="memoSection">
                    <div className="rowLabel">교수 메모</div>
                    <div className="memoBox">
                        {professor.memo}
                    </div>
                </div>
            </div>
        </div>
    );
}