export interface Plan {
    name: string;
    amount: number;
    currency: string;
    interval: string;
    isPopular?: boolean;
    description: string;
    features: string[]
}

export const availablePlans : Plan[] = [
    {
        name:"Weekly Plan",
        amount:1,
        currency:"INR",
        interval:"week",
        description:"Great if yout want to try out the service first",
        features:[
            "Unlimited AI meal plans",
            "AI Nutrition insights for each meal"
        ]
    },
    {
        name:"Monthly Plan",
        amount:1,
        currency:"INR",
        isPopular:true,
        interval:"month",
        description:"Perfect for ongoing,month to month meal planning",
        features:[
            "Unlimited AI meal plans",
            "AI Nutrition insights for each meal"
        ]
    },
    {
        name:"Yearly Plan",
        amount:1,
        currency:"INR",
        interval:"year",
        description:"Best value for those commited to improving their diet long-term",
        features:[
            "Unlimited AI meal plans",
            "AI Nutrition insights for each meal"
        ]
    }
]