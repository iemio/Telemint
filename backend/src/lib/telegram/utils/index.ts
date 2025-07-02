import bot from "../config.js";

export const generateInviteLink = async (groupId: number, userId: number) => {
    try {
        // Get chat info to check if it's a supergroup
        const chat = await bot.getChat(groupId);

        // Only attempt to unban if it's a supergroup or channel
        if (chat.type === "supergroup" || chat.type === "channel") {
            await bot.unbanChatMember(groupId, userId, {
                only_if_banned: true,
            });
        }

        const link = await bot.createChatInviteLink(groupId, {
            expire_date: Math.floor(Date.now() / 1000) + 3600, // Note: Telegram expects Unix timestamp in seconds
            member_limit: 1,
        });

        return link;
    } catch (error) {
        console.error("Error generating invite link:", error);
        throw error;
    }
};

export async function removeUserFromGroup(chatId: number, userId: number) {
    if (!userId) {
        return;
    }

    await bot.banChatMember(chatId, userId);
}
