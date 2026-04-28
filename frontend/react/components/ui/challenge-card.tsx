interface ChallengeCardProps {
    isFree?: boolean;
    title: string;
    description: string;
    difficulty: number;

}


export function ChallengeCard({
    isFree = false,
    title,
    description,
    difficulty,
}: ChallengeCardProps) {
    return (
        <div className="">
            {isFree ? (title) :"Не бесплатно"}
        </div>
    )
}