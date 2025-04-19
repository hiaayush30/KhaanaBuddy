export interface Plan {
    name: string;
    amount: number;
    currency: string;
    interval: PlanInterval;
    isPopular?: boolean;
    description: string;
    features: string[]
}

export type PlanInterval = "weekly"|"yearly"|"monthly"

export const availablePlans : Plan[] = [
    {
        name:"Weekly Plan",
        amount:1,
        currency:"INR",
        interval:"weekly",
        description:"Great if yout want to try out the service first",
        features:[
            "Unlimited AI meal plans",
            "AI Nutrition insights for each meal"
        ]
    },
    {
        name:"Monthly Plan",
        amount:2,
        currency:"INR",
        isPopular:true,
        interval:"monthly",
        description:"Perfect for ongoing,month to month meal planning",
        features:[
            "Unlimited AI meal plans",
            "AI Nutrition insights for each meal"
        ]
    },
    {
        name:"Yearly Plan",
        amount:3,
        currency:"INR",
        interval:"yearly",
        description:"Best value for those commited to improving their diet long-term",
        features:[
            "Unlimited AI meal plans",
            "AI Nutrition insights for each meal"
        ]
    }
]