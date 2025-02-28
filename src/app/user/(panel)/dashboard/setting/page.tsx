import { 
    Card, 
    CardContent, 
    CardHeader 
} from "@/components/ui/card";

const SettingInfoPage = () => {
    return (
        <Card>
            <CardHeader>
                personal information
            </CardHeader>
            <CardContent>
                <div>
                    <div>
                        Name
                    </div>
                    <div>
                        Email
                    </div>
                    <div>
                        Store Count
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SettingInfoPage;